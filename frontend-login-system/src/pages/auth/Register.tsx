
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "@/components/calendar/DatePicker"
import { PasswordInput } from "@/components/auth/PasswordInput"
import React, { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"


interface RegisterProps {
  onClose: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onClose }) => {
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Register</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Register</AlertDialogTitle>
          <AlertDialogDescription>Create an account to get started</AlertDialogDescription>
        </AlertDialogHeader>
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
            </div>
            <br />
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction>Create an account</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
