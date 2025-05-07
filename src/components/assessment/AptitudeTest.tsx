
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AptitudeSkill {
  id: string;
  name: string;
}

interface AptitudeTestProps {
  aptitudeSkills: AptitudeSkill[];
  aptitudeRatings: Record<string, string>;
  handleAptitudeChange: (skillId: string, rating: string) => void;
}

const AptitudeTest = ({
  aptitudeSkills,
  aptitudeRatings,
  handleAptitudeChange
}: AptitudeTestProps) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default AptitudeTest;
