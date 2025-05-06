
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Assessment = () => {
  const [step, setStep] = useState(1);
  const [currentTab, setCurrentTab] = useState("personality");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // State for form data
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    educationLevel: "lycee",
    preferredSubjects: ""
  });

  // State for personality test
  const [personalityAnswers, setPersonalityAnswers] = useState<Record<string, string>>({});
  
  // State for aptitude test
  const [aptitudeRatings, setAptitudeRatings] = useState<Record<string, string>>({});
  
  // State for professional preferences
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [workPreference, setWorkPreference] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.id]: e.target.value
    });
  };

  const handleEducationLevelChange = (value: string) => {
    setPersonalInfo({
      ...personalInfo,
      educationLevel: value
    });
  };

  const handlePersonalityChange = (questionId: string, value: string) => {
    setPersonalityAnswers({
      ...personalityAnswers,
      [questionId]: value
    });
  };

  const handleAptitudeChange = (skillId: string, rating: string) => {
    setAptitudeRatings({
      ...aptitudeRatings,
      [skillId]: rating
    });
  };

  const toggleSector = (sector: string) => {
    if (selectedSectors.includes(sector)) {
      setSelectedSectors(selectedSectors.filter(s => s !== sector));
    } else {
      setSelectedSectors([...selectedSectors, sector]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Vous devez être connecté pour soumettre une évaluation");
      navigate("/login");
      return;
    }
    
    try {
      setLoading(true);
      
      // Format preferred subjects as an array
      const preferredSubjectsArray = personalInfo.preferredSubjects
        ? personalInfo.preferredSubjects.split(',').map(subject => subject.trim())
        : [];
      
      // 1. Save assessment data to Supabase
      const { data: assessmentData, error: assessmentError } = await supabase
        .from('assessments')
        .insert({
          user_id: user.id,
          first_name: personalInfo.firstName,
          last_name: personalInfo.lastName,
          age: parseInt(personalInfo.age) || null,
          education_level: personalInfo.educationLevel,
          preferred_subjects: preferredSubjectsArray,
          personality_results: personalityAnswers,
          aptitude_results: aptitudeRatings,
          professional_preferences: {
            sectors: selectedSectors,
            workPreference: workPreference,
            additionalInfo: additionalInfo
          }
        })
        .select()
        .single();
      
      if (assessmentError) {
        throw new Error(assessmentError.message);
      }
      
      // 2. Call the Deepseek API via our edge function
      const assessmentPayload = {
        assessmentId: assessmentData.id,
        assessmentData: {
          personalInfo: {
            firstName: personalInfo.firstName,
            lastName: personalInfo.lastName,
            age: parseInt(personalInfo.age) || null,
            educationLevel: personalInfo.educationLevel,
            preferredSubjects: preferredSubjectsArray
          },
          personalityResults: personalityAnswers,
          aptitudeResults: aptitudeRatings,
          professionalPreferences: {
            sectors: selectedSectors,
            workPreference: workPreference,
            additionalInfo: additionalInfo
          }
        }
      };
      
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke('analyze-career', {
        body: assessmentPayload,
      });
      
      if (aiError) {
        throw new Error(`Erreur lors de l'analyse IA: ${aiError.message}`);
      }
      
      toast.success("Évaluation complétée avec succès !");
      
      // Navigate to results page
      navigate(`/assessment-results/${assessmentData.id}`);
      
    } catch (error) {
      console.error("Error submitting assessment:", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  // Personality questions
  const personalityQuestions = [
    { id: "q1", a: "Je préfère travailler en équipe et j'aime être entouré(e) de personnes.", b: "Je préfère travailler seul(e) et j'apprécie d'avoir du temps pour réfléchir." },
    { id: "q2", a: "Je préfère suivre un plan bien établi.", b: "Je préfère m'adapter et improviser au fur et à mesure." },
    { id: "q3", a: "Je suis très organisé(e) et je planifie à l'avance.", b: "Je suis flexible et je m'adapte facilement aux changements." },
    { id: "q4", a: "Je prends des décisions basées sur la logique et l'analyse.", b: "Je prends des décisions basées sur mes valeurs et mes émotions." },
    { id: "q5", a: "Je préfère les environnements structurés avec des règles claires.", b: "Je préfère les environnements créatifs avec beaucoup de liberté." }
  ];

  // Aptitude skills
  const aptitudeSkills = [
    { id: "math", name: "Résolution de problèmes mathématiques" },
    { id: "verbal", name: "Communication verbale" },
    { id: "creative", name: "Créativité artistique" },
    { id: "critical", name: "Analyse et réflexion critique" },
    { id: "organization", name: "Organisation et planification" }
  ];

  // Sectors
  const sectors = [
    "Technologie & Informatique",
    "Santé & Médecine",
    "Éducation & Formation",
    "Finances & Commerce",
    "Arts & Culture",
    "Sciences & Recherche",
    "Ingénierie & Construction",
    "Communication & Médias",
    "Environnement & Agriculture"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-slate-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Découvre ton profil</h1>
              <p className="text-gray-600">
                Réponds aux questions pour obtenir des recommandations personnalisées de métiers et de formations
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between mb-8 relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
              
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= i ? "bg-aaf-blue text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {i}
                  </div>
                  <div className="text-sm mt-2 font-medium">
                    {i === 1 && "Informations personnelles"}
                    {i === 2 && "Tests de personnalité"}
                    {i === 3 && "Préférences professionnelles"}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step Content */}
              <Card className="border-none shadow-lg">
                {step === 1 && (
                  <>
                    <CardHeader>
                      <CardTitle>Informations personnelles</CardTitle>
                      <CardDescription>
                        Ces informations nous aideront à mieux comprendre ton parcours actuel
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input 
                            id="firstName" 
                            placeholder="Ton prénom" 
                            value={personalInfo.firstName}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Ton nom" 
                            value={personalInfo.lastName}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="ton.email@exemple.com" 
                            value={personalInfo.email}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="age">Âge</Label>
                          <Input 
                            id="age" 
                            type="number" 
                            placeholder="18" 
                            value={personalInfo.age}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="education">Niveau d'études actuel</Label>
                        <RadioGroup 
                          defaultValue="lycee"
                          value={personalInfo.educationLevel}
                          onValueChange={handleEducationLevelChange}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="lycee" id="lycee" />
                            <Label htmlFor="lycee">Lycéen</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="etudiant" id="etudiant" />
                            <Label htmlFor="etudiant">Étudiant</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="diplome" id="diplome" />
                            <Label htmlFor="diplome">Diplômé</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="autre" id="autre" />
                            <Label htmlFor="autre">Autre</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="preferredSubjects">Matières préférées (séparées par des virgules)</Label>
                        <Textarea 
                          id="preferredSubjects" 
                          placeholder="Ex: Mathématiques, Français, Histoire..." 
                          value={personalInfo.preferredSubjects}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                    </CardContent>
                  </>
                )}

                {step === 2 && (
                  <>
                    <CardHeader>
                      <CardTitle>Tests de personnalité</CardTitle>
                      <CardDescription>
                        Ces tests nous aideront à déterminer ton profil et tes traits de personnalité dominants
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="personality" onValueChange={setCurrentTab} value={currentTab}>
                        <TabsList className="grid grid-cols-2 mb-8">
                          <TabsTrigger value="personality">Personnalité</TabsTrigger>
                          <TabsTrigger value="aptitudes">Aptitudes</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="personality" className="space-y-6">
                          <p className="text-gray-600 mb-4">
                            Pour chaque paire d'affirmations, sélectionne celle qui te correspond le plus.
                          </p>
                          
                          {personalityQuestions.map((question) => (
                            <div key={question.id} className="border rounded-lg p-4 space-y-3">
                              <p className="font-medium">Question {question.id.slice(1)}</p>
                              <RadioGroup 
                                value={personalityAnswers[question.id] || ""}
                                onValueChange={(value) => handlePersonalityChange(question.id, value)}
                              >
                                <div className="flex items-start space-x-2 p-2 rounded hover:bg-slate-50">
                                  <RadioGroupItem value="a" id={`${question.id}a`} className="mt-1" />
                                  <Label htmlFor={`${question.id}a`} className="font-normal cursor-pointer">
                                    {question.a}
                                  </Label>
                                </div>
                                <div className="flex items-start space-x-2 p-2 rounded hover:bg-slate-50">
                                  <RadioGroupItem value="b" id={`${question.id}b`} className="mt-1" />
                                  <Label htmlFor={`${question.id}b`} className="font-normal cursor-pointer">
                                    {question.b}
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                          ))}
                          
                          <div className="flex justify-between">
                            <Button type="button" variant="outline" onClick={() => setCurrentTab("aptitudes")}>
                              Question suivante
                            </Button>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="aptitudes" className="space-y-6">
                          <p className="text-gray-600 mb-4">
                            Évalue tes compétences dans les domaines suivants (1 = Faible, 5 = Excellent).
                          </p>
                          
                          {aptitudeSkills.map((skill) => (
                            <div key={skill.id} className="space-y-1">
                              <Label>{skill.name}</Label>
                              <div className="flex justify-between gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <div key={rating} className="flex-1">
                                    <RadioGroup 
                                      value={aptitudeRatings[skill.id] || ""}
                                      onValueChange={(value) => handleAptitudeChange(skill.id, value)}
                                    >
                                      <div className="flex flex-col items-center space-y-1">
                                        <RadioGroupItem 
                                          value={`${rating}`} 
                                          id={`skill${skill.id}rating${rating}`} 
                                        />
                                        <Label 
                                          htmlFor={`skill${skill.id}rating${rating}`} 
                                          className="font-normal cursor-pointer text-sm"
                                        >
                                          {rating}
                                        </Label>
                                      </div>
                                    </RadioGroup>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </>
                )}

                {step === 3 && (
                  <>
                    <CardHeader>
                      <CardTitle>Préférences professionnelles</CardTitle>
                      <CardDescription>
                        Indique-nous tes préférences concernant ton futur environnement de travail
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <Label>Quels secteurs d'activité t'intéressent? (plusieurs choix possibles)</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {sectors.map((sector, i) => (
                            <div key={i} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`sector${i}`} 
                                checked={selectedSectors.includes(sector)}
                                onCheckedChange={() => toggleSector(sector)}
                              />
                              <Label htmlFor={`sector${i}`} className="font-normal cursor-pointer">
                                {sector}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label>Comment préfères-tu travailler?</Label>
                        <RadioGroup 
                          value={workPreference}
                          onValueChange={setWorkPreference}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="employee" id="employee" />
                            <Label htmlFor="employee" className="font-normal">Salarié(e) en entreprise</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="freelance" id="freelance" />
                            <Label htmlFor="freelance" className="font-normal">Freelance / Indépendant(e)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="entrepreneur" id="entrepreneur" />
                            <Label htmlFor="entrepreneur" className="font-normal">Entrepreneur / Créateur d'entreprise</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="function" id="function" />
                            <Label htmlFor="function" className="font-normal">Fonction publique</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="additional">Informations supplémentaires (optionnel)</Label>
                        <Textarea 
                          id="additional" 
                          placeholder="Y a-t-il des informations importantes concernant tes préférences professionnelles que tu souhaites ajouter?" 
                          value={additionalInfo}
                          onChange={(e) => setAdditionalInfo(e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </>
                )}

                <CardFooter className="flex justify-between">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={handlePrevStep} 
                    disabled={step === 1}
                  >
                    Précédent
                  </Button>
                  {step < 3 ? (
                    <Button 
                      type="button"
                      onClick={handleNextStep}
                    >
                      Suivant
                    </Button>
                  ) : (
                    <Button 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyse en cours...
                        </>
                      ) : (
                        "Voir mes résultats"
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;
