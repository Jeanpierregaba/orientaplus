
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import ProgressSteps from "@/components/assessment/ProgressSteps";
import PersonalInfoForm from "@/components/assessment/PersonalInfoForm";
import PersonalityTest from "@/components/assessment/PersonalityTest";
import AptitudeTest from "@/components/assessment/AptitudeTest";
import ProfessionalPreferences from "@/components/assessment/ProfessionalPreferences";
import { useAssessmentData } from "@/hooks/useAssessmentData";
import { useAssessmentSubmit } from "@/hooks/useAssessmentSubmit";

const Assessment = () => {
  const [step, setStep] = useState(1);
  const [currentTab, setCurrentTab] = useState("personality");
  
  const {
    personalInfo,
    personalityAnswers,
    aptitudeRatings,
    selectedSectors,
    workPreference,
    additionalInfo,
    handlePersonalInfoChange,
    handleEducationLevelChange,
    handlePersonalityChange,
    handleAptitudeChange,
    toggleSector,
    setWorkPreference,
    setAdditionalInfo,
    personalityQuestions,
    aptitudeSkills,
    sectors
  } = useAssessmentData();
  
  const { loading, handleSubmit } = useAssessmentSubmit();

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

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e, {
      personalInfo,
      personalityAnswers,
      aptitudeRatings,
      selectedSectors,
      workPreference,
      additionalInfo
    });
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

            <ProgressSteps step={step} />

            <form onSubmit={onSubmit}>
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
                      <PersonalInfoForm
                        personalInfo={personalInfo}
                        handlePersonalInfoChange={handlePersonalInfoChange}
                        handleEducationLevelChange={handleEducationLevelChange}
                      />
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
                        
                        <TabsContent value="personality">
                          <PersonalityTest
                            personalityQuestions={personalityQuestions}
                            personalityAnswers={personalityAnswers}
                            handlePersonalityChange={handlePersonalityChange}
                            setCurrentTab={setCurrentTab}
                          />
                        </TabsContent>
                        
                        <TabsContent value="aptitudes">
                          <AptitudeTest
                            aptitudeSkills={aptitudeSkills}
                            aptitudeRatings={aptitudeRatings}
                            handleAptitudeChange={handleAptitudeChange}
                          />
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
                      <ProfessionalPreferences
                        sectors={sectors}
                        selectedSectors={selectedSectors}
                        workPreference={workPreference}
                        additionalInfo={additionalInfo}
                        toggleSector={toggleSector}
                        setWorkPreference={setWorkPreference}
                        setAdditionalInfo={setAdditionalInfo}
                      />
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
