
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { School } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Exemple de données d'écoles partenaires
const schoolsData = [
  {
    id: 1,
    name: "École Polytechnique",
    location: "Palaiseau, France",
    description: "Une école d'ingénieurs de renommée mondiale spécialisée dans les sciences et la technologie.",
    fields: ["Ingénierie", "Mathématiques", "Physique", "Informatique"],
    website: "https://www.polytechnique.edu",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "HEC Paris",
    location: "Paris, France",
    description: "Une école de commerce de premier plan offrant des programmes de gestion et de leadership.",
    fields: ["Commerce", "Finance", "Marketing", "Management"],
    website: "https://www.hec.edu",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Sciences Po",
    location: "Paris, France",
    description: "Institution spécialisée en sciences humaines et sociales, relations internationales et politique.",
    fields: ["Sciences Politiques", "Droit", "Économie", "Relations Internationales"],
    website: "https://www.sciencespo.fr",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "ESSEC Business School",
    location: "Cergy, France",
    description: "Une des principales écoles de commerce proposant des formations en management et commerce.",
    fields: ["Commerce", "Entrepreneuriat", "Finance", "Marketing Digital"],
    website: "https://www.essec.edu",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "École des Mines",
    location: "Paris, France",
    description: "École d'ingénieurs formant des experts en sciences et technologies appliquées.",
    fields: ["Génie Civil", "Sciences des Matériaux", "Énergie", "Environnement"],
    website: "https://www.minesparis.psl.eu",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    name: "ESCP Business School",
    location: "Paris, France",
    description: "La plus ancienne école de commerce du monde avec un réseau international.",
    fields: ["Commerce International", "Finance", "Stratégie", "Entrepreneuriat"],
    website: "https://www.escp.eu",
    image: "/placeholder.svg"
  }
];

const Schools = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos Écoles Partenaires</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez nos établissements d'enseignement partenaires qui offrent des formations adaptées 
              à votre parcours d'orientation professionnelle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schoolsData.map((school) => (
              <Card key={school.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={school.image} 
                    alt={school.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="h-5 w-5 text-aaf-blue" />
                    {school.name}
                  </CardTitle>
                  <CardDescription>{school.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{school.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {school.fields.map((field, index) => (
                      <span 
                        key={index} 
                        className="inline-block bg-soft-purple text-aaf-blue text-xs px-2 py-1 rounded-md"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <a 
                    href={school.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-aaf-blue hover:underline text-sm font-medium"
                  >
                    Visiter le site web →
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Schools;
