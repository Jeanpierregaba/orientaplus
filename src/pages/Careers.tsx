
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const careers = [
  {
    title: "Développeur Web",
    sector: "Technologie",
    description: "Création et maintenance de sites web et d'applications.",
    skills: ["JavaScript", "HTML/CSS", "Frameworks web"],
    education: ["Licence Informatique", "École d'ingénieurs", "Formations spécialisées"],
    salary: "300,000 - 1,200,000 FCFA",
    growth: "Élevé",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop",
  },
  {
    title: "Data Scientist",
    sector: "Technologie",
    description: "Analyse de données pour en extraire des insights et prédictions.",
    skills: ["Statistiques", "Machine Learning", "Python/R"],
    education: ["Master en Data Science", "École d'ingénieurs", "Doctorat"],
    salary: "600,000 - 2,000,000 FCFA",
    growth: "Très élevé",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Médecin",
    sector: "Santé",
    description: "Diagnostic et traitement des maladies et blessures.",
    skills: ["Diagnostic", "Connaissances médicales", "Relation patient"],
    education: ["Doctorat en Médecine", "Spécialisation médicale"],
    salary: "800,000 - 3,000,000 FCFA",
    growth: "Stable",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1374&auto=format&fit=crop",
  },
  {
    title: "Architecte",
    sector: "Ingénierie",
    description: "Conception et planification de bâtiments et structures.",
    skills: ["Design", "CAO", "Gestion de projet"],
    education: ["Master en Architecture", "École d'architecture"],
    salary: "500,000 - 1,800,000 FCFA",
    growth: "Modéré",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1531&auto=format&fit=crop",
  },
  {
    title: "Analyste Financier",
    sector: "Finance",
    description: "Évaluation des investissements et analyse des performances financières.",
    skills: ["Analyse financière", "Modélisation", "Excel"],
    education: ["Master en Finance", "École de commerce", "CFA"],
    salary: "600,000 - 2,200,000 FCFA",
    growth: "Modéré",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Designer UX/UI",
    sector: "Technologie",
    description: "Création d'interfaces utilisateur intuitives et esthétiques.",
    skills: ["Design thinking", "Prototypage", "Recherche utilisateur"],
    education: ["Licence en Design", "Formations spécialisées"],
    salary: "400,000 - 1,500,000 FCFA",
    growth: "Élevé",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1470&auto=format&fit=crop",
  },
];

const sectors = [
  "Tous",
  "Technologie",
  "Santé",
  "Finance",
  "Ingénierie",
  "Éducation",
  "Arts",
  "Sciences",
];

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("Tous");
  
  const filteredCareers = careers.filter((career) => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "Tous" || career.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-slate-50 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore les métiers</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvre les carrières qui correspondent à ton profil et à tes aspirations
            </p>
          </div>
          
          {/* Search & Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2">
                <Input
                  placeholder="Rechercher un métier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Tabs defaultValue="Tous" onValueChange={setSelectedSector}>
                  <TabsList className="w-full h-full grid grid-cols-4 md:grid-cols-4">
                    {sectors.slice(0, 4).map((sector) => (
                      <TabsTrigger key={sector} value={sector} className="text-xs md:text-sm">
                        {sector}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
          
          {/* Careers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredCareers.map((career, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={career.image}
                    alt={career.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{career.title}</CardTitle>
                      <CardDescription>{career.sector}</CardDescription>
                    </div>
                    <Badge variant="secondary">{career.growth}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{career.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Compétences requises:</h4>
                    <div className="flex flex-wrap gap-1">
                      {career.skills.map((skill, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Formations:</span>
                      <span className="text-right">{career.education.join(", ")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Salaire mensuel:</span>
                      <span className="font-medium">{career.salary}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Voir les détails</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredCareers.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Aucun métier trouvé</h3>
              <p className="text-gray-600">
                Essaye de modifier tes critères de recherche ou contacte-nous pour une orientation personnalisée.
              </p>
            </div>
          )}
          
          <div className="text-center">
            <Button variant="outline" size="lg">Charger plus de métiers</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
