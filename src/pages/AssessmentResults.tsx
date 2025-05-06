
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, BriefcaseBusiness, GraduationCap, CheckCircle2, ChevronRight, Award } from "lucide-react";

interface CareerRecommendation {
  id: string;
  assessment_id: string;
  recommendation_number: number;
  career_title: string;
  description: string | null;
  skills_required: string[] | null;
  education_path: string | null;
  industry: string | null;
  compatibility_score: number | null;
}

const AssessmentResults = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!assessmentId || !user) {
      return;
    }
    
    const fetchResults = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('career_recommendations')
          .select('*')
          .eq('assessment_id', assessmentId)
          .order('recommendation_number', { ascending: true });
          
        if (error) {
          throw new Error(error.message);
        }
        
        if (data && data.length > 0) {
          setRecommendations(data);
        } else {
          setError('Aucune recommandation trouvée pour cette évaluation');
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les résultats"
        });
        setError('Une erreur est survenue lors du chargement des recommandations');
      } finally {
        setLoading(false);
      }
    };
    
    fetchResults();
  }, [assessmentId, user, toast]);
  
  const handleNewAssessment = () => {
    navigate('/assessment');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-aaf-blue" />
            <h2 className="mt-4 text-lg font-medium">Chargement des résultats...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-slate-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Résultats de ton évaluation</h1>
              <p className="text-gray-600">
                Voici les recommandations de carrière basées sur ton profil
              </p>
            </div>
            
            {error ? (
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Erreur</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-red-500">{error}</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button onClick={handleNewAssessment}>Faire une nouvelle évaluation</Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="space-y-8">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-8">
                    <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                    <TabsTrigger value="career1">Option 1</TabsTrigger>
                    <TabsTrigger value="career2">Option 2</TabsTrigger>
                    <TabsTrigger value="career3">Option 3</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <Card className="border-none shadow-lg">
                      <CardHeader>
                        <CardTitle>Résumé des recommandations</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <p className="mb-4">
                          Après analyse de ton profil, nous avons identifié trois parcours professionnels qui correspondent le mieux à tes préférences, aptitudes et traits de personnalité.
                        </p>
                        
                        <div className="grid gap-6">
                          {recommendations.map((rec) => (
                            <div key={rec.id} className="flex items-center bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                              <div className="mr-4 bg-aaf-blue rounded-full p-3 text-white">
                                <BriefcaseBusiness size={24} />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-lg">{rec.career_title}</h3>
                                <p className="text-gray-600 text-sm line-clamp-1">
                                  {rec.description || "Aucune description disponible"}
                                </p>
                              </div>
                              <div className="ml-2 flex items-center gap-4">
                                {rec.compatibility_score && (
                                  <div className="text-right">
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                      {rec.compatibility_score}% compatible
                                    </Badge>
                                  </div>
                                )}
                                <ChevronRight className="text-gray-400" />
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
                          <h3 className="font-medium flex items-center gap-2 text-blue-700">
                            <CheckCircle2 size={18} />
                            Prochaines étapes
                          </h3>
                          <p className="text-blue-600 mt-2 text-sm">
                            Explore les détails de chaque recommandation en utilisant les onglets ci-dessus. N'hésite pas à refaire le test si tu souhaites affiner tes résultats.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {recommendations.map((rec, index) => (
                    <TabsContent key={rec.id} value={`career${index + 1}`}>
                      <Card className="border-none shadow-lg">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle>{rec.career_title}</CardTitle>
                            {rec.compatibility_score && (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-0">
                                {rec.compatibility_score}% compatible
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {rec.industry && (
                            <div className="text-sm text-gray-500">
                              Secteur: {rec.industry}
                            </div>
                          )}
                          
                          {rec.description && (
                            <div>
                              <h3 className="font-medium text-lg mb-2">Description</h3>
                              <p className="text-gray-700">
                                {rec.description}
                              </p>
                            </div>
                          )}
                          
                          <Separator />
                          
                          {rec.skills_required && rec.skills_required.length > 0 && (
                            <div>
                              <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                                <Award size={18} />
                                Compétences requises
                              </h3>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {rec.skills_required.map((skill, i) => (
                                  <Badge key={i} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {rec.education_path && (
                            <div>
                              <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                                <GraduationCap size={18} />
                                Parcours éducatif recommandé
                              </h3>
                              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-1">
                                <p className="text-gray-700">
                                  {rec.education_path}
                                </p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
                
                <div className="flex justify-center pt-4">
                  <Button onClick={handleNewAssessment} variant="outline">
                    Faire une nouvelle évaluation
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AssessmentResults;
