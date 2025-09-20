
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { languages } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { CheckCircle, Tractor, Wheat } from "lucide-react";

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
    signIn: "Sign in to your {role} account.",
    mockLoginMessage: "In a real app, this would be a secure OTP login. For now, just proceed to your dashboard.",
    proceedToDashboard: "Proceed to Dashboard",
    goBack: "Go Back",
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
    signIn: "ನಿಮ್ಮ {role} ಖಾತೆಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ.",
    mockLoginMessage: "ನೈಜ ಅಪ್ಲಿಕೇಶನ್‌ನಲ್ಲಿ, ಇದು ಸುರಕ್ಷಿತ OTP ಲಾಗಿನ್ ಆಗಿರುತ್ತದೆ. ಸದ್ಯಕ್ಕೆ, ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಮುಂದುವರಿಯಿರಿ.",
    proceedToDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಮುಂದುವರಿಯಿರಿ",
    goBack: "ಹಿಂದಕ್ಕೆ ಹೋಗು",
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
    signIn: "നിങ്ങളുടെ {role} അക്കൗണ്ടിലേക്ക് സൈൻ ഇൻ ചെയ്യുക.",
    mockLoginMessage: "ഒരു യഥാർത്ഥ അപ്ലിക്കേഷനിൽ, ഇത് ഒരു സുരക്ഷിത OTP ലോഗിൻ ആയിരിക്കും. തൽക്കാലം, നിങ്ങളുടെ ഡാഷ്‌ബോർഡിലേക്ക് പോകുക.",
    proceedToDashboard: "ഡാഷ്‌ബോർഡിലേക്ക് പോകുക",
    goBack: "തിരികെ പോകുക",
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
    signIn: "உங்கள் {role} கணக்கில் உள்நுழைக.",
    mockLoginMessage: "ஒரு உண்மையான பயன்பாட்டில், இது ஒரு பாதுகாப்பான OTP உள்நுழைவாக இருக்கும். இப்போதைக்கு, உங்கள் டாஷ்போர்டுக்குச் செல்லவும்.",
    proceedToDashboard: "டாஷ்போர்டுக்குச் செல்லவும்",
    goBack: "பின் செல்",
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
    signIn: "अपने {role} खाते में साइन इन करें।",
    mockLoginMessage: "एक वास्तविक ऐप में, यह एक सुरक्षित ओटीपी लॉगिन होगा। अभी के लिए, बस अपने डैशबोर्ड पर आगे बढ़ें।",
    proceedToDashboard: "डैशबोर्ड पर जाएं",
    goBack: "वापस जाओ",
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
                className={`p-4 text-center cursor-pointer hover:shadow-lg transition-shadow ${
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
                className={`p-4 text-center cursor-pointer hover:shadow-lg transition-shadow ${
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
        return (
          <Card className="w-full max-w-lg animate-in fade-in-50 duration-500 shadow-2xl">
            <CardHeader className="text-center">
               <div className="mx-auto mb-4">
                <Logo />
              </div>
              <CardTitle className="text-2xl font-headline">{t.oneLastStep}</CardTitle>
              <CardDescription>{t.signIn.replace('{role}', selectedRole || '')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">{t.mockLoginMessage}</p>
                <Button onClick={handleLogin} className="w-full" size="lg">
                    {t.proceedToDashboard}
                </Button>
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
