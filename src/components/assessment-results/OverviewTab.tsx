
import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CareerOverviewCard from "./CareerOverviewCard";

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

interface OverviewTabProps {
  recommendations: CareerRecommendation[];
}

const OverviewTab = ({ recommendations }: OverviewTabProps) => {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle>Résumé des recommandations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="mb-4">
          Après analyse de ton profil, nous avons identifié trois parcours professionnels 
          qui correspondent le mieux à tes préférences, aptitudes et traits de personnalité.
        </p>
        
        <div className="grid gap-6">
          {recommendations.map((rec) => (
            <CareerOverviewCard key={rec.id} recommendation={rec} />
          ))}
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
          <h3 className="font-medium flex items-center gap-2 text-blue-700">
            <CheckCircle2 size={18} />
            Prochaines étapes
          </h3>
          <p className="text-blue-600 mt-2 text-sm">
            Explore les détails de chaque recommandation en utilisant les onglets ci-dessus. 
            N'hésite pas à refaire le test si tu souhaites affiner tes résultats.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
