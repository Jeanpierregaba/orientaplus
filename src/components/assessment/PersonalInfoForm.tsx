
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PersonalInfoFormProps {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    educationLevel: string;
    preferredSubjects: string;
  };
  handlePersonalInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleEducationLevelChange: (value: string) => void;
}

const PersonalInfoForm = ({
  personalInfo,
  handlePersonalInfoChange,
  handleEducationLevelChange
}: PersonalInfoFormProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input 
            id="firstName" 
            placeholder="Ton prénom" 
            value={personalInfo.firstName}
            onChange={handlePersonalInfoChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input 
            id="lastName" 
            placeholder="Ton nom" 
            value={personalInfo.lastName}
            onChange={handlePersonalInfoChange}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="ton.email@exemple.com" 
            value={personalInfo.email}
            onChange={handlePersonalInfoChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Âge</Label>
          <Input 
            id="age" 
            type="number" 
            placeholder="18" 
            value={personalInfo.age}
            onChange={handlePersonalInfoChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="education">Niveau d'études actuel</Label>
        <RadioGroup 
          defaultValue="lycee"
          value={personalInfo.educationLevel}
          onValueChange={handleEducationLevelChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lycee" id="lycee" />
            <Label htmlFor="lycee">Lycéen</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="etudiant" id="etudiant" />
            <Label htmlFor="etudiant">Étudiant</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="diplome" id="diplome" />
            <Label htmlFor="diplome">Diplômé</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="autre" id="autre" />
            <Label htmlFor="autre">Autre</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="preferredSubjects">Matières préférées (séparées par des virgules)</Label>
        <Textarea 
          id="preferredSubjects" 
          placeholder="Ex: Mathématiques, Français, Histoire..." 
          value={personalInfo.preferredSubjects}
          onChange={handlePersonalInfoChange}
        />
      </div>
    </>
  );
};

export default PersonalInfoForm;
