
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mentors = [
  {
    name: "Dr. Amadou Diallo",
    role: "Médecin cardiologue",
    experience: "15 ans d'expérience",
    specialties: ["Cardiologie", "Médecine interne", "Recherche médicale"],
    bio: "Cardiologue expérimenté, formé en France et aux États-Unis, je partage mon temps entre pratique clinique et enseignement universitaire.",
    availability: "2-3 heures/semaine",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    initials: "AD",
    sector: "Santé",
  },
  {
    name: "Fatou Ndiaye",
    role: "Analyste Financière",
    experience: "8 ans d'expérience",
    specialties: ["Finance d'entreprise", "Analyse de marché", "Investissements"],
    bio: "Analyste financière chez Deloitte avec une expertise dans les marchés africains et une passion pour l'éducation financière.",
    availability: "1-2 heures/semaine",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    initials: "FN",
    sector: "Finance",
  },
  {
    name: "Moussa Touré",
    role: "Développeur Full Stack",
    experience: "10 ans d'expérience",
    specialties: ["JavaScript", "React", "Node.js", "AWS"],
    bio: "Développeur senior chez une startup fintech, j'ai travaillé sur des projets innovants dans plusieurs pays africains.",
    availability: "3-4 heures/semaine",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    initials: "MT",
    sector: "Technologie",
  },
  {
    name: "Aïcha Koné",
    role: "Architecte",
    experience: "12 ans d'expérience",
    specialties: ["Architecture durable", "Planification urbaine", "Design écologique"],
    bio: "Architecte primée spécialisée dans les constructions durables adaptées au climat africain. Fondatrice d'un cabinet d'architecture.",
    availability: "1-2 heures/semaine",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    initials: "AK",
    sector: "Ingénierie",
  },
  {
    name: "Omar Sall",
    role: "Professeur d'université",
    experience: "20 ans d'expérience",
    specialties: ["Littérature francophone", "Histoire africaine", "Pédagogie"],
    bio: "Professeur titulaire en littérature à l'Université Cheikh Anta Diop, chercheur et auteur de plusieurs ouvrages académiques.",
    availability: "2-3 heures/semaine",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    initials: "OS",
    sector: "Éducation",
  },
  {
    name: "Mariama Bah",
    role: "Designer UX/UI",
    experience: "7 ans d'expérience",
    specialties: ["Design d'interface", "Recherche utilisateur", "Design thinking"],
    bio: "Designer créative passionnée par l'expérience utilisateur et l'accessibilité. J'ai travaillé pour des clients internationaux.",
    availability: "2-3 heures/semaine",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    initials: "MB",
    sector: "Technologie",
  },
];

const sectors = [
  "Tous",
  "Technologie",
  "Santé",
  "Finance",
  "Ingénierie",
  "Éducation",
];

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("Tous");
  
  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mentor.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "Tous" || mentor.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-slate-50 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Trouve ton mentor</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connecte-toi avec des professionnels expérimentés qui partageront leur expérience et te guideront dans ton parcours
            </p>
          </div>
          
          {/* Search & Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2">
                <Input
                  placeholder="Rechercher un mentor par nom ou profession..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Tabs defaultValue="Tous" onValueChange={setSelectedSector}>
                  <TabsList className="w-full h-full grid grid-cols-3 md:grid-cols-3">
                    {sectors.slice(0, 3).map((sector) => (
                      <TabsTrigger key={sector} value={sector} className="text-xs md:text-sm">
                        {sector}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
          
          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredMentors.map((mentor, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex gap-4 items-center">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={mentor.avatar} alt={mentor.name} />
                      <AvatarFallback>{mentor.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{mentor.name}</CardTitle>
                      <CardDescription className="text-base">{mentor.role}</CardDescription>
                      <Badge variant="outline" className="mt-1">
                        {mentor.experience}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{mentor.bio}</p>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Spécialités:</h4>
                    <div className="flex flex-wrap gap-1">
                      {mentor.specialties.map((specialty, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-aaf-blue">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>Disponibilité: <span className="font-medium">{mentor.availability}</span></span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button className="flex-1">Contacter</Button>
                  <Button variant="outline" className="flex-1">Voir le profil</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Aucun mentor trouvé</h3>
              <p className="text-gray-600">
                Essaye de modifier tes critères de recherche ou reviens plus tard pour découvrir de nouveaux mentors.
              </p>
            </div>
          )}
          
          <div className="text-center">
            <Button variant="outline" size="lg">Voir plus de mentors</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Mentors;
