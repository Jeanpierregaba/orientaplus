
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orienta-dark-green/90 to-orienta-medium-green/90"></div>
        <img
          src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1470&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à découvrir ta voie professionnelle idéale?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoins des milliers d'étudiants qui ont trouvé leur voie grâce à notre plateforme d'orientation innovante.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-orienta-yellow text-orienta-dark-green hover:bg-orienta-yellow/80" asChild>
              <Link to="/register">Créer mon compte</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
              <Link to="/assessment">Démarrer l'évaluation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
