
import React from "react";
import { Award, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

interface CareerDetailCardProps {
  recommendation: CareerRecommendation;
}

const CareerDetailCard = ({ recommendation }: CareerDetailCardProps) => {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{recommendation.career_title}</CardTitle>
          {recommendation.compatibility_score && (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-0">
              {recommendation.compatibility_score}% compatible
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {recommendation.industry && (
          <div className="text-sm text-gray-500">
            Secteur: {recommendation.industry}
          </div>
        )}
        
        {recommendation.description && (
          <div>
            <h3 className="font-medium text-lg mb-2">Description</h3>
            <p className="text-gray-700">
              {recommendation.description}
            </p>
          </div>
        )}
        
        <Separator />
        
        {recommendation.skills_required && recommendation.skills_required.length > 0 && (
          <div>
            <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
              <Award size={18} />
              Compétences requises
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {recommendation.skills_required.map((skill, i) => (
                <Badge key={i} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {recommendation.education_path && (
          <div>
            <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
              <GraduationCap size={18} />
              Parcours éducatif recommandé
            </h3>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-1">
              <p className="text-gray-700">
                {recommendation.education_path}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CareerDetailCard;
