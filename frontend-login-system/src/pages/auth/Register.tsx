import { Button } from "@/components/ui/button"
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

export function Register() {
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  return (
    <div className="flex justify-center items-center space-x-0 sm:space-x-20 h-screen sm:h-auto">
      <img src={Image} alt="3DAuth" className="hidden sm:block w-full md:w-1/2 lg:w-1/3 xl:w-1/4"/>
      <Card className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-[500px] mx-auto">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" required/>
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" required/>
                </div>
              </div>
              <DatePicker />
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Male" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" placeholder="Enter your email" required/>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="passwordConfirmation">Confirm Password</Label>
                <PasswordInput
                  id="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  autoComplete="password"
                />
              </div>
              <Button type="submit">Create an account</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}