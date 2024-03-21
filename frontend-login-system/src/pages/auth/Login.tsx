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
import { useState } from "react"
import Image from '../../assets/3DAuth.png'
import { Link } from 'react-router-dom'; // import Link from react-router-dom
import React from "react"
import { Register } from "@/pages/auth/Register"

export function Login() {
  const [password, setPassword] = useState("")
  const [showDialog, setShowDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setShowDialog(false);
  }  

return (
    <div className="flex justify-center items-center space-x-4 sm:space-x-20">
        <img src={Image} alt="3DAuth" className="hidden sm:block w-full md:w-1/2 lg:w-1/3 xl:w-1/4"/>
        <Card className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-[500px] mx-auto">
        <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to get started</CardDescription>
        </CardHeader>
        <CardContent>
                <form>
                <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" placeholder="Enter your email" required/>
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
                        <Link to="#" className="text-sm text-blue-500">Forgot Password?</Link>
                </div>
                <br />
                    <div className="flex justify-between">
                            <Register onClose={handleCloseDialog} />
                            <Button type="submit">Login</Button>
                    </div>
            </form>
        </CardContent>
        </Card>
    </div>
)
}
