
import { useState } from "react";
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

const Assessment = () => {
  const [step, setStep] = useState(1);
  const [currentTab, setCurrentTab] = useState("personality");

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
                        <Input id="firstName" placeholder="Ton prénom" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input id="lastName" placeholder="Ton nom" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="ton.email@exemple.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">Âge</Label>
                        <Input id="age" type="number" placeholder="18" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="education">Niveau d'études actuel</Label>
                      <RadioGroup defaultValue="lycee">
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
                      <Label htmlFor="notes">Matières préférées (optionnel)</Label>
                      <Textarea id="notes" placeholder="Quelles sont tes matières préférées à l'école/université?" />
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
                        
                        {[1, 2, 3, 4, 5].map((q) => (
                          <div key={q} className="border rounded-lg p-4 space-y-3">
                            <p className="font-medium">Question {q}/20</p>
                            <RadioGroup defaultValue="">
                              <div className="flex items-start space-x-2 p-2 rounded hover:bg-slate-50">
                                <RadioGroupItem value="a" id={`q${q}a`} className="mt-1" />
                                <Label htmlFor={`q${q}a`} className="font-normal cursor-pointer">
                                  Je préfère travailler en équipe et j'aime être entouré(e) de personnes.
                                </Label>
                              </div>
                              <div className="flex items-start space-x-2 p-2 rounded hover:bg-slate-50">
                                <RadioGroupItem value="b" id={`q${q}b`} className="mt-1" />
                                <Label htmlFor={`q${q}b`} className="font-normal cursor-pointer">
                                  Je préfère travailler seul(e) et j'apprécie d'avoir du temps pour réfléchir.
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        ))}
                        
                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => setCurrentTab("aptitudes")}>
                            Question suivante
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="aptitudes" className="space-y-6">
                        <p className="text-gray-600 mb-4">
                          Évalue tes compétences dans les domaines suivants (1 = Faible, 5 = Excellent).
                        </p>
                        
                        {[
                          "Résolution de problèmes mathématiques",
                          "Communication verbale",
                          "Créativité artistique",
                          "Analyse et réflexion critique",
                          "Organisation et planification"
                        ].map((skill, i) => (
                          <div key={i} className="space-y-1">
                            <Label>{skill}</Label>
                            <div className="flex justify-between gap-2">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <div key={rating} className="flex-1">
                                  <RadioGroup defaultValue="">
                                    <div className="flex flex-col items-center space-y-1">
                                      <RadioGroupItem value={`${rating}`} id={`skill${i}rating${rating}`} />
                                      <Label htmlFor={`skill${i}rating${rating}`} className="font-normal cursor-pointer text-sm">
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
                        {[
                          "Technologie & Informatique",
                          "Santé & Médecine",
                          "Éducation & Formation",
                          "Finances & Commerce",
                          "Arts & Culture",
                          "Sciences & Recherche",
                          "Ingénierie & Construction",
                          "Communication & Médias",
                          "Environnement & Agriculture"
                        ].map((sector, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <Checkbox id={`sector${i}`} />
                            <Label htmlFor={`sector${i}`} className="font-normal cursor-pointer">
                              {sector}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Comment préfères-tu travailler?</Label>
                      <RadioGroup defaultValue="">
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
                    
                    <div className="space-y-3">
                      <Label>Quelles sont tes priorités professionnelles? (classe par ordre d'importance)</Label>
                      <div className="space-y-2">
                        {[
                          "Rémunération attractive",
                          "Équilibre vie pro/perso",
                          "Opportunités d'évolution",
                          "Impact social positif",
                          "Développement de compétences"
                        ].map((priority, i) => (
                          <div key={i} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                            <div className="font-medium w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                              {i + 1}
                            </div>
                            <div>{priority}</div>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 italic">
                        Fais glisser les éléments pour les réordonner selon tes priorités
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="additional">Informations supplémentaires (optionnel)</Label>
                      <Textarea id="additional" placeholder="Y a-t-il des informations importantes concernant tes préférences professionnelles que tu souhaites ajouter?" />
                    </div>
                  </CardContent>
                </>
              )}

              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePrevStep} disabled={step === 1}>
                  Précédent
                </Button>
                {step < 3 ? (
                  <Button onClick={handleNextStep}>
                    Suivant
                  </Button>
                ) : (
                  <Button>
                    Voir mes résultats
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;
