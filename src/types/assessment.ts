
export interface CareerRecommendation {
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
