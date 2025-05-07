
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";

interface AssessmentData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    educationLevel: string;
    preferredSubjects: string;
  };
  personalityAnswers: Record<string, string>;
  aptitudeRatings: Record<string, string>;
  selectedSectors: string[];
  workPreference: string;
  additionalInfo: string;
}

export const useAssessmentSubmit = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent, assessmentData: AssessmentData) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Vous devez être connecté pour soumettre une évaluation");
      navigate("/login");
      return;
    }
    
    try {
      setLoading(true);
      
      // Format preferred subjects as an array
      const preferredSubjectsArray = assessmentData.personalInfo.preferredSubjects
        ? assessmentData.personalInfo.preferredSubjects.split(',').map(subject => subject.trim())
        : [];
      
      // 1. Save assessment data to Supabase
      const { data: assessmentResult, error: assessmentError } = await supabase
        .from('assessments')
        .insert({
          user_id: user.id,
          first_name: assessmentData.personalInfo.firstName,
          last_name: assessmentData.personalInfo.lastName,
          age: parseInt(assessmentData.personalInfo.age) || null,
          education_level: assessmentData.personalInfo.educationLevel,
          preferred_subjects: preferredSubjectsArray,
          personality_results: assessmentData.personalityAnswers,
          aptitude_results: assessmentData.aptitudeRatings,
          professional_preferences: {
            sectors: assessmentData.selectedSectors,
            workPreference: assessmentData.workPreference,
            additionalInfo: assessmentData.additionalInfo
          }
        })
        .select()
        .single();
      
      if (assessmentError) {
        throw new Error(assessmentError.message);
      }
      
      // 2. Call the Edge function to analyze career options
      const assessmentPayload = {
        assessmentId: assessmentResult.id,
        assessmentData: {
          personalInfo: {
            firstName: assessmentData.personalInfo.firstName,
            lastName: assessmentData.personalInfo.lastName,
            age: parseInt(assessmentData.personalInfo.age) || null,
            educationLevel: assessmentData.personalInfo.educationLevel,
            preferredSubjects: preferredSubjectsArray
          },
          personalityResults: assessmentData.personalityAnswers,
          aptitudeResults: assessmentData.aptitudeRatings,
          professionalPreferences: {
            sectors: assessmentData.selectedSectors,
            workPreference: assessmentData.workPreference,
            additionalInfo: assessmentData.additionalInfo
          }
        }
      };
      
      try {
        const { data: aiResponse, error: aiError } = await supabase.functions.invoke('analyze-career', {
          body: assessmentPayload,
        });
        
        if (aiError) {
          console.warn(`AI analysis warning: ${aiError.message}`);
          // Continue without throwing, as we've implemented fallback recommendations
        }
      } catch (apiError) {
        // Log the error but continue - our edge function has fallback recommendations
        console.warn("API error during career analysis:", apiError);
      }
      
      toast.success("Évaluation complétée avec succès !");
      
      // Navigate to results page
      navigate(`/assessment-results/${assessmentResult.id}`);
      
    } catch (error) {
      console.error("Error submitting assessment:", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSubmit
  };
};
