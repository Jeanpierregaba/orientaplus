
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { CareerRecommendation } from "@/types/assessment";
import LoadingView from "@/components/assessment-results/LoadingView";
import ErrorView from "@/components/assessment-results/ErrorView";
import OverviewTab from "@/components/assessment-results/OverviewTab";
import CareerDetailCard from "@/components/assessment-results/CareerDetailCard";

const AssessmentResults = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const fetchResults = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
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
      uiToast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les résultats"
      });
      setError('Une erreur est survenue lors du chargement des recommandations');
    } finally {
      setLoading(false);
    }
  }, [assessmentId, uiToast]);
  
  useEffect(() => {
    if (!assessmentId || !user) {
      return;
    }
    
    fetchResults();
  }, [assessmentId, user, fetchResults]);
  
  const handleNewAssessment = () => {
    navigate('/assessment');
  };

  const handleRetry = () => {
    // Using the sonner toast for notifications
    toast("Nouvelle tentative de chargement...", {
      description: "Chargement des résultats en cours"
    });
    fetchResults();
  };
  
  if (loading) {
    return <LoadingView />;
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
              <ErrorView 
                errorMessage={error} 
                onNewAssessment={handleNewAssessment}
                onRetry={handleRetry}
              />
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
                    <OverviewTab recommendations={recommendations} />
                  </TabsContent>
                  
                  {recommendations.map((rec, index) => (
                    <TabsContent key={rec.id} value={`career${index + 1}`}>
                      <CareerDetailCard recommendation={rec} />
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

