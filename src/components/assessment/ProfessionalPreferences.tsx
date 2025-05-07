
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface ProfessionalPreferencesProps {
  sectors: string[];
  selectedSectors: string[];
  workPreference: string;
  additionalInfo: string;
  toggleSector: (sector: string) => void;
  setWorkPreference: (preference: string) => void;
  setAdditionalInfo: (info: string) => void;
}

const ProfessionalPreferences = ({
  sectors,
  selectedSectors,
  workPreference,
  additionalInfo,
  toggleSector,
  setWorkPreference,
  setAdditionalInfo
}: ProfessionalPreferencesProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Quels secteurs d'activité t'intéressent? (plusieurs choix possibles)</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {sectors.map((sector, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Checkbox 
                id={`sector${i}`} 
                checked={selectedSectors.includes(sector)}
                onCheckedChange={() => toggleSector(sector)}
              />
              <Label htmlFor={`sector${i}`} className="font-normal cursor-pointer">
                {sector}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        <Label>Comment préfères-tu travailler?</Label>
        <RadioGroup 
          value={workPreference}
          onValueChange={setWorkPreference}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="employee" id="employee" />
            <Label htmlFor="employee" className="font-normal">Salarié(e) en entreprise</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="freelance" id="freelance" />
            <Label htmlFor="freelance" className="font-normal">Freelance / Indépendant(e)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="entrepreneur" id="entrepreneur" />
            <Label htmlFor="entrepreneur" className="font-normal">Entrepreneur / Créateur d'entreprise</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="function" id="function" />
            <Label htmlFor="function" className="font-normal">Fonction publique</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="additional">Informations supplémentaires (optionnel)</Label>
        <Textarea 
          id="additional" 
          placeholder="Y a-t-il des informations importantes concernant tes préférences professionnelles que tu souhaites ajouter?" 
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ProfessionalPreferences;
