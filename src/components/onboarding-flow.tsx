
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { languages } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { CheckCircle, Tractor, Wheat, KeyRound, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Step = "language" | "role" | "login";
type Role = "farmer" | "worker";

const translations: Record<string, Record<string, string>> = {
  en: {
    welcome: "Welcome to AgriConnect",
    selectLanguage: "Please select your language",
    continue: "Continue",
    chooseRole: "Choose Your Role",
    hireOrWork: "Are you looking to hire or to work?",
    farmer: "Farmer",
    iWantToHire: "I want to hire workers",
    worker: "Worker",
    iAmLookingForWork: "I am looking for work",
    back: "Back",
    oneLastStep: "One Last Step",
    signIn: "Sign in to your account",
    signUp: "Create a new account",
    signInAction: "Sign In",
    signUpAction: "Sign Up",
    phoneNumber: "Phone Number",
    password: "Password",
    proceedToDashboard: "Proceed to Dashboard",
    goBack: "Go Back",
    signInToYourRole: "Sign in to your {role} account.",
    createYourRole: "Create your {role} account.",
  },
  kn: {
    welcome: "ಅಗ್ರಿಕನೆಕ್ಟ್‌ಗೆ ಸುಸ್ವಾಗತ",
    selectLanguage: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    continue: "ಮುಂದುವರಿಸಿ",
    chooseRole: "ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆರಿಸಿ",
    hireOrWork: "ನೀವು ನೇಮಿಸಿಕೊಳ್ಳಲು ಅಥವಾ ಕೆಲಸ ಮಾಡಲು ನೋಡುತ್ತಿದ್ದೀರಾ?",
    farmer: "ರೈತ",
    iWantToHire: "ನಾನು ಕಾರ್ಮಿಕರನ್ನು ನೇಮಿಸಿಕೊಳ್ಳಲು ಬಯಸುತ್ತೇನೆ",
    worker: "ಕಾರ್ಮಿಕ",
    iAmLookingForWork: "ನಾನು ಕೆಲಸ ಹುಡುಕುತ್ತಿದ್ದೇನೆ",
    back: "ಹಿಂದೆ",
    oneLastStep: "ಒಂದು ಕೊನೆಯ ಹೆಜ್ಜೆ",
    signIn: "ನಿಮ್ಮ ಖಾತೆಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ",
    signUp: "ಹೊಸ ಖಾತೆಯನ್ನು ತೆರೆಯಿರಿ",
    signInAction: "ಸೈನ್ ಇನ್ ಮಾಡಿ",
    signUpAction: "ಸೈನ್ ಅಪ್ ಮಾಡಿ",
    phoneNumber: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    password: "ಪಾಸ್ವರ್ಡ್",
    proceedToDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಮುಂದುವರಿಯಿರಿ",
    goBack: "ಹಿಂದಕ್ಕೆ ಹೋಗು",
    signInToYourRole: "ನಿಮ್ಮ {role} ಖಾತೆಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ.",
    createYourRole: "ನಿಮ್ಮ {role} ಖಾತೆಯನ್ನು ರಚಿಸಿ.",
  },
  ml: {
    welcome: "അഗ്രികണക്റ്റിലേക്ക് സ്വാഗതം",
    selectLanguage: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക",
    continue: "തുടരുക",
    chooseRole: "നിങ്ങളുടെ പങ്ക് തിരഞ്ഞെടുക്കുക",
    hireOrWork: "നിങ്ങൾ നിയമിക്കാൻ നോക്കുകയാണോ അതോ ജോലി ചെയ്യാനാണോ?",
    farmer: "കർഷകൻ",
    iWantToHire: "ഞാൻ തൊഴിലാളികളെ നിയമിക്കാൻ ആഗ്രഹിക്കുന്നു",
    worker: "തൊഴിലാളി",
    iAmLookingForWork: "ഞാൻ ജോലി അന്വേഷിക്കുകയാണ്",
    back: "തിരികെ",
    oneLastStep: "അവസാനമായി ഒരു പടി കൂടി",
    signIn: "നിങ്ങളുടെ അക്കൗണ്ടിൽ സൈൻ ഇൻ ചെയ്യുക",
    signUp: "പുതിയ അക്കൗണ്ട് ഉണ്ടാക്കുക",
    signInAction: "സൈൻ ഇൻ ചെയ്യുക",
    signUpAction: "സൈൻ അപ്പ് ചെയ്യുക",
    phoneNumber: "ഫോൺ നമ്പർ",
    password: "പാസ്സ്വേർഡ്",
    proceedToDashboard: "ഡാഷ്‌ബോർഡിലേക്ക് പോകുക",
    goBack: "തിരികെ പോകുക",
    signInToYourRole: "നിങ്ങളുടെ {role} അക്കൗണ്ടിലേക്ക് സൈൻ ഇൻ ചെയ്യുക.",
    createYourRole: "നിങ്ങളുടെ {role} അക്കൗണ്ട് സൃഷ്ടിക്കുക.",
  },
  ta: {
    welcome: "அக்ரிகனெக்ட்டுக்கு வரவேற்கிறோம்",
    selectLanguage: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    continue: "தொடரவும்",
    chooseRole: "உங்கள் பங்கைத் தேர்வுசெய்க",
    hireOrWork: "நீங்கள் வேலைக்கு அமர்த்த விரும்புகிறீர்களா அல்லது வேலை செய்ய விரும்புகிறீர்களா?",
    farmer: "விவசாயி",
    iWantToHire: "நான் தொழிலாளர்களை வேலைக்கு அமர்த்த விரும்புகிறேன்",
    worker: "தொழிலாளி",
    iAmLookingForWork: "நான் வேலை தேடுகிறேன்",
    back: "பின்னால்",
    oneLastStep: "இன்னும் ஒரு படி",
    signIn: "உங்கள் கணக்கில் உள்நுழையவும்",
    signUp: "புதிய கணக்கை உருவாக்கவும்",
    signInAction: "உள்நுழையவும்",
    signUpAction: "பதிவுபெறுக",
    phoneNumber: "தொலைபேசி எண்",
    password: "கடவுச்சொல்",
    proceedToDashboard: "டாஷ்போர்டுக்குச் செல்லவும்",
    goBack: "பின் செல்",
    signInToYourRole: "உங்கள் {role} கணக்கில் உள்நுழைக.",
    createYourRole: "உங்கள் {role} கணக்கை உருவாக்கவும்.",
  },
  hi: {
    welcome: "एग्रीकनेक्ट में आपका स्वागत है",
    selectLanguage: "कृपया अपनी भाषा चुनें",
    continue: "जारी रखें",
    chooseRole: "अपनी भूमिका चुनें",
    hireOrWork: "क्या आप काम पर रखना चाहते हैं या काम करना चाहते हैं?",
    farmer: "किसान",
    iWantToHire: "मैं श्रमिकों को काम पर रखना चाहता हूं",
    worker: "मजदूर",
    iAmLookingForWork: "मैं काम की तलाश में हूं",
    back: "वापस",
    oneLastStep: "एक आखिरी कदम",
    signIn: "अपने खाते में साइन इन करें",
    signUp: "नया खाता बनाएँ",
    signInAction: "साइन इन करें",
    signUpAction: "साइन अप करें",
    phoneNumber: "फोन नंबर",
    password: "पासवर्ड",
    proceedToDashboard: "डैशबोर्ड पर जाएं",
    goBack: "वापस जाओ",
    signInToYourRole: "अपने {role} खाते में साइन इन करें।",
    createYourRole: "अपना {role} खाता बनाएँ।",
  },
};

export function OnboardingFlow() {
  const [step, setStep] = useState<Step>("language");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const router = useRouter();

  const t = useMemo(() => translations[selectedLanguage] || translations.en, [selectedLanguage]);

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
              <CardTitle className="text-2xl font-headline">{t.welcome}</CardTitle>
              <CardDescription>{t.selectLanguage}</CardDescription>
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
                {t.continue}
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
              <CardTitle className="text-2xl font-headline">{t.chooseRole}</CardTitle>
              <CardDescription>{t.hireOrWork}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                className={`p-4 text-center cursor-pointer hover:shadow-lg transition-shadow relative ${
                  selectedRole === "farmer" ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedRole("farmer")}
              >
                <Tractor className="mx-auto h-12 w-12 text-primary mb-2" />
                <h3 className="font-bold text-lg">{t.farmer}</h3>
                <p className="text-sm text-muted-foreground">{t.iWantToHire}</p>
                {selectedRole === "farmer" && <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />}
              </Card>
              <Card
                className={`p-4 text-center cursor-pointer hover:shadow-lg transition-shadow relative ${
                  selectedRole === "worker" ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedRole("worker")}
              >
                <Wheat className="mx-auto h-12 w-12 text-accent mb-2" />
                <h3 className="font-bold text-lg">{t.worker}</h3>
                <p className="text-sm text-muted-foreground">{t.iAmLookingForWork}</p>
                 {selectedRole === "worker" && <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />}
              </Card>
              <div className="md:col-span-2 flex flex-col sm:flex-row gap-2 mt-4">
                 <Button variant="outline" onClick={() => setStep("language")} className="w-full">{t.back}</Button>
                 <Button onClick={() => setStep("login")} className="w-full" disabled={!selectedRole}>
                  {t.continue}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      case "login":
        const roleText = selectedRole ? (selectedRole === 'farmer' ? t.farmer : t.worker) : '';
        return (
          <Card className="w-full max-w-lg animate-in fade-in-50 duration-500 shadow-2xl">
            <CardHeader className="text-center">
               <div className="mx-auto mb-4">
                <Logo />
              </div>
              <CardTitle className="text-2xl font-headline">{t.oneLastStep}</CardTitle>
               <CardDescription>
                {t.signInToYourRole.replace('{role}', roleText)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Tabs defaultValue="signin" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">{t.signIn}</TabsTrigger>
                        <TabsTrigger value="signup">{t.signUp}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin" className="pt-4">
                        <div className="space-y-4">
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input type="tel" placeholder={t.phoneNumber} className="pl-10" />
                            </div>
                             <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input type="password" placeholder={t.password} className="pl-10" />
                            </div>
                            <Button onClick={handleLogin} className="w-full" size="lg">
                                {t.signInAction}
                            </Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="signup" className="pt-4">
                        <div className="space-y-4">
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input type="tel" placeholder={t.phoneNumber} className="pl-10" />
                            </div>
                             <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input type="password" placeholder={t.password} className="pl-10" />
                            </div>
                            <Button onClick={handleLogin} className="w-full" size="lg">
                                {t.signUpAction}
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
                <Button variant="link" onClick={() => setStep("role")} className="w-full">
                    {t.goBack}
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
