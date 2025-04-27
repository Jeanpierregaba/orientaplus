
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const careerPaths = [
  {
    title: "Ingénierie & Technologie",
    description: "Développement logiciel, IA, cybersécurité, robotique et plus encore.",
    image: "https://images.unsplash.com/photo-1581092921461-fd0e5756a5fa?q=80&w=1470&auto=format&fit=crop",
    skills: ["Analytique", "Technique", "Innovation"],
    color: "bg-blue-50",
  },
  {
    title: "Économie & Finance",
    description: "Finance d'entreprise, banque, entrepreneuriat, gestion de patrimoine.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop",
    skills: ["Calcul", "Stratégie", "Rigueur"],
    color: "bg-green-50",
  },
  {
    title: "Santé & Bien-être",
    description: "Médecine, pharmacie, recherche biomédicale, santé publique.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop",
    skills: ["Empathie", "Précision", "Communication"],
    color: "bg-red-50",
  },
  {
    title: "Art & Culture",
    description: "Design, production audiovisuelle, marketing digital, édition.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1471&auto=format&fit=crop",
    skills: ["Créativité", "Expression", "Vision"],
    color: "bg-purple-50",
  },
];

const CareerPathsSection = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Découvre ton futur métier</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore des centaines de carrières classées par domaines et découvre celles qui correspondent le mieux à ta personnalité
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {careerPaths.map((career, index) => (
            <Card key={index} className={`border-none overflow-hidden hover:shadow-xl transition-all duration-300 ${career.color}`}>
              <div className="h-48 overflow-hidden">
                <img
                  src={career.image}
                  alt={career.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{career.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  {career.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/careers">Explorer ce domaine</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/careers">Voir tous les domaines</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareerPathsSection;
