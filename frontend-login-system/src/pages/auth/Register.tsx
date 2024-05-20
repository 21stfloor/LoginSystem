import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/auth/PasswordInput"
import { DatePicker } from "@/components/calendar/DatePicker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import Image from '../../assets/3DAuth.png'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios"
import PasswordStrengthBar from 'react-password-strength-bar';
import apiClient from "@/api"



function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

export function Register() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [gender, setGender] = useState("Male")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    email: "",
    password: [] as string[],
    passwordConfirmation: [] as string[],
  });

  const validatePassword = (password: string) => {
    const passwordErrors = [];
    if (!password) {
      passwordErrors.push("This field is required.");
    }
    if (password && password.length < 8) {
      passwordErrors.push("Password must be at least 8 characters long.");
    }
    if (password && !/[A-Z]/.test(password)) {
      passwordErrors.push("Password must contain at least one uppercase letter.");
    }
    if (password && !/[a-z]/.test(password)) {
      passwordErrors.push("Password must contain at least one lowercase letter.");
    }
    if (password && !/\d/.test(password)) {
      passwordErrors.push("Password must contain at least one number.");
    }
    if (password && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)) {
      passwordErrors.push("Password must contain at least one special character.");
    }

    return passwordErrors;
  }

  const validateFields = async () => {
    const passwordError = validatePassword(password);
    const nameRegex = /^[A-Za-z ]+$/;
    let firstNameError = "";
    let lastNameError = "";
    let birthdayError = "";

    if (!firstName) {
      firstNameError = "This field is required";
    } else if (!firstName.match(nameRegex)) {
      firstNameError = "First name can only contain letters and spaces";
    }

    if (!lastName) {
      lastNameError = "This field is required";
    } else if (!lastName.match(nameRegex)) {
      lastNameError = "Last name can only contain letters";
    }

    if (!birthday) {
      birthdayError = "This field is required";
    }

    const newErrors = {
      firstName: firstNameError,
      lastName: lastNameError,
      birthday: birthdayError,
      gender: gender ? "" : "Please select a gender",
      email: email ? "" : "This field is required",
      password: passwordError,
      passwordConfirmation: password !== passwordConfirmation ? ["Passwords do not match"] : [],
    };
    setErrors(newErrors);
    if (passwordError.length > 0) {
      return false;
    }
    return !Object.values(newErrors).some((error) => error !== "" && !Array.isArray(error));
  }

  const registerUser = async () => {
    const isValid = await validateFields();

    if (!isValid) {
      return;
    }

    try {
      const birthdayString = birthday ? birthday.toISOString().slice(0, 10) : "";
      const validateResponse = await apiClient.post("/user/validate-registration", {
        firstName,
        lastName,
        birthday: birthdayString,
        gender,
        email,
        password,
        confirmPassword: passwordConfirmation,
      });
      if (validateResponse.status === 200) {
        await apiClient.post("/user/register", {
          firstName,
          lastName,
          birthday: birthdayString,
          gender,
          email,
          password,
        });
        toast.success("User registered successfully")
      } else {
        throw new Error("Registration validation failed");
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          const responseData = error.response.data as { errors: { password: string } };
          if (responseData && responseData.errors && responseData.errors.password) {
            toast.error(responseData.errors.password);
          }
        }
      }
    }
  }

  const handleDateSelected = (date: Date) => {
    setBirthday(date);
    setErrors((prevErrors) => ({ ...prevErrors, birthday: "" }));
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsLoading(true)
    await registerUser()
    setIsLoading(false)
  }


  return (
    <div className="flex justify-center items-center space-x-0 sm:space-x-20 h-screen sm:h-auto">
      <img src={Image} alt="3DAuth" className="hidden sm:block w-full md:w-1/2 lg:w-1/3 xl:w-1/4" />
      <Card className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-[500px] mx-auto">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    disabled={isLoading}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={classNames({ 'border-red-500': errors.firstName })}
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-sm">{errors.firstName}</span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    disabled={isLoading}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={classNames({ 'border-red-500': errors.lastName })}
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-sm">{errors.lastName}</span>
                  )}
                </div>
              </div>
              <DatePicker
                disabled={isLoading}
                selected={birthday}
                onChange={(date: Date) => setBirthday(date)}
                onDateSelected={handleDateSelected}
                className={classNames({ 'border-red-500': errors.birthday })}
              />
              {errors.birthday && (
                <span className="text-red-500 text-sm">{errors.birthday}</span>
              )}
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    disabled={isLoading}
                    onValueChange={(value) => setGender(value)}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Male" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <span className="text-red-500 text-sm">{errors.gender}</span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={classNames({ 'border-red-500': errors.email })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    const passwordErrors = validatePassword(e.target.value);
                    const passwordConfirmationErrors = e.target.value !== passwordConfirmation ? ['Passwords do not match'] : [];
                    setErrors((prevErrors) => ({ ...prevErrors, password: passwordErrors, passwordConfirmation: passwordConfirmationErrors }));
                  }}
                  autoComplete="password"
                  disabled={isLoading}
                  className={classNames({ 'border-black': errors.password })}
                />
                {errors.password && errors.password.map((error, index) =>
                  <li key={index} style={{ color: 'red', fontSize: '13px', listStyleType: 'none' }}>{error}</li>)}
                <PasswordStrengthBar
                  password={password}
                  shortScoreWord="Too short"
                  scoreWords={['Weak', 'Okay', 'Good', 'Strong', 'Very Strong']}
                  barColors={['#ccc', '#f00', '#f90', '#ff0', '#0f0']}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="passwordConfirmation">Confirm Password</Label>
                <PasswordInput
                  id="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={(e) => {
                    setPasswordConfirmation(e.target.value);
                    const passwordConfirmationErrors = password !== e.target.value ? ['Passwords do not match'] : [];
                    setErrors((prevErrors) => ({ ...prevErrors, passwordConfirmation: passwordConfirmationErrors }));
                  }}
                  autoComplete="password"
                  disabled={isLoading}
                  className={classNames({ 'border-black': errors.passwordConfirmation })}
                />
                {errors.passwordConfirmation && errors.passwordConfirmation.map((error, index) =>
                  <li key={index} style={{ color: 'red', fontSize: '13px', listStyleType: 'none' }}>{error}</li>
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create an account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
