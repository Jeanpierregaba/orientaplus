
import { useState } from "react";

export const useAssessmentData = () => {
  // State for form data
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    educationLevel: "lycee",
    preferredSubjects: ""
  });

  // State for personality test
  const [personalityAnswers, setPersonalityAnswers] = useState<Record<string, string>>({});
  
  // State for aptitude test
  const [aptitudeRatings, setAptitudeRatings] = useState<Record<string, string>>({});
  
  // State for professional preferences
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [workPreference, setWorkPreference] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.id]: e.target.value
    });
  };

  const handleEducationLevelChange = (value: string) => {
    setPersonalInfo({
      ...personalInfo,
      educationLevel: value
    });
  };

  const handlePersonalityChange = (questionId: string, value: string) => {
    setPersonalityAnswers({
      ...personalityAnswers,
      [questionId]: value
    });
  };

  const handleAptitudeChange = (skillId: string, rating: string) => {
    setAptitudeRatings({
      ...aptitudeRatings,
      [skillId]: rating
    });
  };

  const toggleSector = (sector: string) => {
    if (selectedSectors.includes(sector)) {
      setSelectedSectors(selectedSectors.filter(s => s !== sector));
    } else {
      setSelectedSectors([...selectedSectors, sector]);
    }
  };

  // Personality questions
  const personalityQuestions = [
    { id: "q1", a: "Je préfère travailler en équipe et j'aime être entouré(e) de personnes.", b: "Je préfère travailler seul(e) et j'apprécie d'avoir du temps pour réfléchir." },
    { id: "q2", a: "Je préfère suivre un plan bien établi.", b: "Je préfère m'adapter et improviser au fur et à mesure." },
    { id: "q3", a: "Je suis très organisé(e) et je planifie à l'avance.", b: "Je suis flexible et je m'adapte facilement aux changements." },
    { id: "q4", a: "Je prends des décisions basées sur la logique et l'analyse.", b: "Je prends des décisions basées sur mes valeurs et mes émotions." },
    { id: "q5", a: "Je préfère les environnements structurés avec des règles claires.", b: "Je préfère les environnements créatifs avec beaucoup de liberté." }
  ];

  // Aptitude skills
  const aptitudeSkills = [
    { id: "math", name: "Résolution de problèmes mathématiques" },
    { id: "verbal", name: "Communication verbale" },
    { id: "creative", name: "Créativité artistique" },
    { id: "critical", name: "Analyse et réflexion critique" },
    { id: "organization", name: "Organisation et planification" }
  ];

  // Sectors
  const sectors = [
    "Technologie & Informatique",
    "Santé & Médecine",
    "Éducation & Formation",
    "Finances & Commerce",
    "Arts & Culture",
    "Sciences & Recherche",
    "Ingénierie & Construction",
    "Communication & Médias",
    "Environnement & Agriculture"
  ];

  return {
    personalInfo,
    personalityAnswers,
    aptitudeRatings,
    selectedSectors,
    workPreference,
    additionalInfo,
    handlePersonalInfoChange,
    handleEducationLevelChange,
    handlePersonalityChange,
    handleAptitudeChange,
    toggleSector,
    setWorkPreference,
    setAdditionalInfo,
    personalityQuestions,
    aptitudeSkills,
    sectors
  };
};
