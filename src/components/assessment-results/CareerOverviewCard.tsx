
import React from "react";
import { BriefcaseBusiness, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

interface CareerOverviewCardProps {
  recommendation: CareerRecommendation;
}

const CareerOverviewCard = ({ recommendation }: CareerOverviewCardProps) => {
  return (
    <div className="flex items-center bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="mr-4 bg-aaf-blue rounded-full p-3 text-white">
        <BriefcaseBusiness size={24} />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-lg">{recommendation.career_title}</h3>
        <p className="text-gray-600 text-sm line-clamp-1">
          {recommendation.description || "Aucune description disponible"}
        </p>
      </div>
      <div className="ml-2 flex items-center gap-4">
        {recommendation.compatibility_score && (
          <div className="text-right">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {recommendation.compatibility_score}% compatible
            </Badge>
          </div>
        )}
        <ChevronRight className="text-gray-400" />
      </div>
    </div>
  );
};

export default CareerOverviewCard;
