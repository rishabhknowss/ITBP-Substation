import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Fingerprint, Eye, Mic, AlertCircle, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [scanningStatus, setScanningStatus] = useState<
    "idle" | "scanning" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState(
    "Place your finger on the scanner or enter your credentials"
  );
  const [useBiometric, setUseBiometric] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleScan = () => {
    setScanningStatus("scanning");
    setStatusMessage("Scanning...");
    setTimeout(() => {
      const success = Math.random() > 0.5;
      setScanningStatus(success ? "success" : "error");
      setStatusMessage(
        success
          ? "Authentication successful"
          : "Authentication failed. Please try again."
      );
      if (success) {
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    }, 2000);
  };

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("Authenticating...");
    setTimeout(() => {
      const success = username === "demo" && password === "password";
      setScanningStatus(success ? "success" : "error");
      setStatusMessage(
        success
          ? "Authentication successful"
          : "Authentication failed. Please try again."
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login Dashboard
          </CardTitle>
          <CardDescription className="text-center">
            Choose your login method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <Label htmlFor="biometric-toggle">Use Biometric</Label>
            <Switch
              id="biometric-toggle"
              checked={useBiometric}
              onCheckedChange={setUseBiometric}
            />
          </div>

          {useBiometric ? (
            <>
              <div
                className={`w-32 h-32 mx-auto rounded-full border-4 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  scanningStatus === "scanning"
                    ? "border-blue-500 animate-pulse"
                    : scanningStatus === "success"
                    ? "border-green-500"
                    : scanningStatus === "error"
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onClick={handleScan}
              >
                <Fingerprint
                  className={`w-16 h-16 ${
                    scanningStatus === "scanning"
                      ? "text-blue-500"
                      : scanningStatus === "success"
                      ? "text-green-500"
                      : scanningStatus === "error"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                />
              </div>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Retina Scan</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Mic className="h-4 w-4" />
                  <span className="sr-only">Voice Recognition</span>
                </Button>
              </div>
            </>
          ) : (
            <form onSubmit={handleCredentialSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          )}

          <p className="text-center text-sm font-medium" aria-live="polite">
            {statusMessage}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="ghost" className="text-sm">
            <AlertCircle className="mr-2 h-4 w-4" />
            Need help?
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}