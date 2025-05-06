
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "student",
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, signUp } = useAuth();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  
  const handleRadioChange = (value: string) => {
    setFormData({ ...formData, userType: value });
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, agreeTerms: checked });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    
    setIsLoading(true);
    try {
      await signUp(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.userType
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-10 bg-slate-50">
        <div className="container mx-auto px-4 max-w-lg">
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Créer un compte</CardTitle>
              <CardDescription className="text-center">
                Inscris-toi pour accéder à tous les services de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Je m'inscris en tant que</Label>
                  <RadioGroup
                    value={formData.userType}
                    onValueChange={handleRadioChange}
                    className="flex flex-col space-y-1"
                    disabled={isLoading}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student" className="font-normal">Élève / Étudiant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mentor" id="mentor" />
                      <Label htmlFor="mentor" className="font-normal">Mentor / Professionnel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="institution" id="institution" />
                      <Label htmlFor="institution" className="font-normal">Établissement éducatif</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={handleCheckboxChange}
                    required
                    disabled={isLoading}
                  />
                  <Label htmlFor="agreeTerms" className="font-normal text-sm">
                    J'accepte les <Link to="/terms" className="text-aaf-blue hover:underline">conditions d'utilisation</Link> et la <Link to="/privacy" className="text-aaf-blue hover:underline">politique de confidentialité</Link>
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || !formData.agreeTerms}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Création en cours...
                    </>
                  ) : (
                    "Créer mon compte"
                  )}
                </Button>
              </form>

              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou s'inscrire avec</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="#4285F4"/>
                    <path d="M10.555 12.236h4.453c-.4 1.853-1.866 3.452-4.453 3.452-2.755 0-5-2.244-5-5 0-2.755 2.245-5 5-5 1.188 0 2.233.412 3.06 1.11l-1.228 1.33c-.532-.457-1.222-.731-1.832-.731-1.589 0-2.893 1.303-2.893 3.29 0 1.988 1.304 3.291 2.893 3.291 1.082 0 1.996-.633 2.427-1.758H10.555V12.236z" fill="#EA4335"/>
                    <path d="M7.55 12.003c0-1.683.702-3.265 1.893-4.405L7.215 5.27A8.868 8.868 0 0 0 1.66 12.003c0 2.643 1.149 5.09 3.038 6.748l2.228-2.229A5.271 5.271 0 0 1 7.55 12.003z" fill="#FBBC05"/>
                    <path d="M15.33 17.695c1.536-.83 2.828-2.082 3.731-3.706l-2.513-1.954c-.671 1.035-1.592 1.812-2.687 2.209l1.469 3.451z" fill="#4285F4"/>
                    <path d="M12.002 3.096a5.263 5.263 0 0 1 3.058 1.01l2.228-2.229A8.867 8.867 0 0 0 12.002 0C8.192 0 4.81 2.001 2.865 5.272l2.228 2.228c1.14-1.683 3.017-2.77 4.91-2.404z" fill="#EA4335"/>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" fill="#3b5998"/>
                  </svg>
                  Facebook
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="text-center text-sm text-gray-600">
                Tu as déjà un compte?{" "}
                <Link to="/login" className="text-aaf-blue hover:underline font-medium">
                  Connecte-toi
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
