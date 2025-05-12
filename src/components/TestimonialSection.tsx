
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Aminata Diallo",
    role: "Étudiante en Ingénierie",
    testimonial: "Grâce à Orienta+, j'ai découvert ma passion pour le génie civile. Les tests de personnalité m'ont vraiment aidée à comprendre mes forces et à choisir une voie qui me correspond.",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1374&auto=format&fit=crop",
    initials: "AD",
  },
  {
    name: "Kofi Mensah",
    role: "Étudiant en Commerce",
    testimonial: "Je ne savais pas quelle filière choisir après le bac. La plateforme m'a guidé vers l'économie et la finance, un secteur dans lequel je m'épanouis pleinement aujourd'hui.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop",
    initials: "KM",
  },
  {
    name: "Fatou Sow",
    role: "Étudiante en Médecine",
    testimonial: "Le mentorat proposé par Orienta+ a été déterminant dans mon parcours. J'ai pu échanger avec des médecins qui m'ont confortée dans mon choix et m'ont donné des conseils précieux.",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=1389&auto=format&fit=crop",
    initials: "FS",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ils ont trouvé leur voie</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvre les témoignages d'étudiants qui ont utilisé notre plateforme
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-gray-600 italic">
                  "{testimonial.testimonial}"
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
