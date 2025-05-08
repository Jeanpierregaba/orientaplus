
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-orienta-soft-green py-16 md:py-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orienta-light-green opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orienta-yellow opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-orienta-medium-green opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
              Découvre ton <span className="gradient-text">avenir</span> en Afrique
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Ta plateforme d'orientation qui te guide vers les études et carrières 
              qui correspondent à ta personnalité, tes talents et tes aspirations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Button size="lg" asChild>
                <Link to="/assessment">Découvrir mon profil</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">En savoir plus</Link>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop" 
                alt="Étudiants africains" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg max-w-[200px]">
              <div className="text-orienta-dark-green font-bold text-xl mb-1">+2000</div>
              <div className="text-gray-600 text-sm">Étudiants guidés vers leur voie idéale</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
