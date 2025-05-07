
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

interface PersonalityQuestion {
  id: string;
  a: string;
  b: string;
}

interface PersonalityTestProps {
  personalityQuestions: PersonalityQuestion[];
  personalityAnswers: Record<string, string>;
  handlePersonalityChange: (questionId: string, value: string) => void;
  setCurrentTab: (tab: string) => void;
}

const PersonalityTest = ({
  personalityQuestions,
  personalityAnswers,
  handlePersonalityChange,
  setCurrentTab
}: PersonalityTestProps) => {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-4">
        Pour chaque paire d'affirmations, sélectionne celle qui te correspond le plus.
      </p>
      
      {personalityQuestions.map((question) => (
        <div key={question.id} className="border rounded-lg p-4 space-y-3">
          <p className="font-medium">Question {question.id.slice(1)}</p>
          <RadioGroup 
            value={personalityAnswers[question.id] || ""}
            onValueChange={(value) => handlePersonalityChange(question.id, value)}
          >
            <div className="flex items-start space-x-2 p-2 rounded hover:bg-slate-50">
              <RadioGroupItem value="a" id={`${question.id}a`} className="mt-1" />
              <Label htmlFor={`${question.id}a`} className="font-normal cursor-pointer">
                {question.a}
              </Label>
            </div>
            <div className="flex items-start space-x-2 p-2 rounded hover:bg-slate-50">
              <RadioGroupItem value="b" id={`${question.id}b`} className="mt-1" />
              <Label htmlFor={`${question.id}b`} className="font-normal cursor-pointer">
                {question.b}
              </Label>
            </div>
          </RadioGroup>
        </div>
      ))}
      
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => setCurrentTab("aptitudes")}>
          Question suivante
        </Button>
      </div>
    </div>
  );
};

export default PersonalityTest;
