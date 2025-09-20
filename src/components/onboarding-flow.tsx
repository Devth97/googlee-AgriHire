"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { languages } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { CheckCircle, Tractor, Wheat } from "lucide-react";

type Step = "language" | "role" | "login";
type Role = "farmer" | "worker";

export function OnboardingFlow() {
  const [step, setStep] = useState<Step>("language");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const router = useRouter();

  const handleLogin = () => {
    if (selectedRole === 'farmer') {
      router.push("/farmer");
    } else if (selectedRole === 'worker') {
      router.push("/worker");
    }
  };

  const renderStep = () => {
    switch (step) {
      case "language":
        return (
          <Card className="w-full max-w-lg shadow-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Logo />
              </div>
              <CardTitle className="text-2xl font-headline">Welcome to AgriConnect</CardTitle>
              <CardDescription>Please select your language</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={selectedLanguage === lang.code ? "default" : "outline"}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className="h-12 text-lg"
                  >
                    {lang.name}
                  </Button>
                ))}
              </div>
              <Button onClick={() => setStep("role")} className="w-full mt-6" size="lg">
                Continue
              </Button>
            </CardContent>
          </Card>
        );

      case "role":
        return (
          <Card className="w-full max-w-lg animate-in fade-in-50 duration-500 shadow-2xl">
            <CardHeader className="text-center">
               <div className="mx-auto mb-4">
                <Logo />
              </div>
              <CardTitle className="text-2xl font-headline">Choose Your Role</CardTitle>
              <CardDescription>Are you looking to hire or to work?</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                className={`p-4 text-center cursor-pointer hover:shadow-lg transition-shadow ${
                  selectedRole === "farmer" ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedRole("farmer")}
              >
                <Tractor className="mx-auto h-12 w-12 text-primary mb-2" />
                <h3 className="font-bold text-lg">Farmer</h3>
                <p className="text-sm text-muted-foreground">I want to hire workers</p>
                {selectedRole === "farmer" && <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />}
              </Card>
              <Card
                className={`p-4 text-center cursor-pointer hover:shadow-lg transition-shadow ${
                  selectedRole === "worker" ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedRole("worker")}
              >
                <Wheat className="mx-auto h-12 w-12 text-accent mb-2" />
                <h3 className="font-bold text-lg">Worker</h3>
                <p className="text-sm text-muted-foreground">I am looking for work</p>
                 {selectedRole === "worker" && <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />}
              </Card>
              <div className="md:col-span-2 flex flex-col sm:flex-row gap-2 mt-4">
                 <Button variant="outline" onClick={() => setStep("language")} className="w-full">Back</Button>
                 <Button onClick={() => setStep("login")} className="w-full" disabled={!selectedRole}>
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      case "login":
        return (
          <Card className="w-full max-w-lg animate-in fade-in-50 duration-500 shadow-2xl">
            <CardHeader className="text-center">
               <div className="mx-auto mb-4">
                <Logo />
              </div>
              <CardTitle className="text-2xl font-headline">One Last Step</CardTitle>
              <CardDescription>Sign in to your {selectedRole} account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">In a real app, this would be a secure OTP login. For now, just proceed to your dashboard.</p>
                <Button onClick={handleLogin} className="w-full" size="lg">
                    Proceed to Dashboard
                </Button>
                <Button variant="link" onClick={() => setStep("role")} className="w-full">
                    Go Back
                </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return renderStep();
}
