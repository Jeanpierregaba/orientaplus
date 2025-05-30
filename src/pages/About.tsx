
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CallToAction from "@/components/CallToAction";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Notre Mission</h1>
              <p className="text-xl text-gray-600 mb-8">
                Aider chaque jeune africain à trouver sa voie professionnelle idéale et à construire un avenir à la hauteur de ses aspirations.
              </p>
            </div>
          </div>
        </section>
        
        {/* Problem Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Le problème de l'orientation en Afrique</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    En Afrique francophone, près de 40% des étudiants changent de filière après la première année, et 30% des bacheliers ne savent pas quel cursus choisir.
                  </p>
                  <p>
                    Ce problème engendre des conséquences graves : démotivation, perte de temps, gaspillage de ressources, et parfois abandon des études.
                  </p>
                  <p>
                    Les causes principales sont le manque d'orientation efficace, une méconnaissance de soi (passions, talents, compétences), et une insuffisance d'informations sur les métiers et formations disponibles.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://img.freepik.com/free-photo/study-group-african-people_23-2149156431.jpg?semt=ais_hybrid&w=740" 
                    alt="Problème d'orientation" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-red-50 rounded-lg p-4 shadow-lg max-w-[200px]">
                  <div className="text-red-600 font-bold text-xl mb-1">40%</div>
                  <div className="text-gray-600 text-sm">des étudiants changent de filière après la première année</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Solution Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://media.istockphoto.com/id/1443546306/photo/teacher-teaching-basics-of-using-computer.jpg?s=612x612&w=0&k=20&c=gLFnQsVYtU-qZmrefqj_I8Dwdbkj4hhHpZh5Ichahdg=" 
                    alt="Notre solution" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-6 -left-6 bg-green-50 rounded-lg p-4 shadow-lg max-w-[200px]">
                  <div className="text-green-600 font-bold text-xl mb-1">+80%</div>
                  <div className="text-gray-600 text-sm">de satisfaction chez les étudiants utilisant notre plateforme</div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold mb-6">Notre solution</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Avenir Afrique est une plateforme d'orientation innovante qui aide les jeunes à:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Mieux se connaître grâce à des tests de personnalité et d'aptitudes validés scientifiquement</li>
                    <li>Découvrir des métiers adaptés à leur profil, leurs compétences et leurs aspirations</li>
                    <li>Accéder à des mentors, formations et écoles en adéquation avec leurs objectifs</li>
                    <li>Bénéficier d'un suivi personnalisé tout au long de leur parcours d'orientation</li>
                  </ul>
                  <p>
                    Notre approche unique combine intelligence artificielle, expertise en psychologie de l'orientation et connaissance du marché du travail africain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Notre Équipe</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une équipe passionnée et diversifiée, dédiée à l'orientation des jeunes africains
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* Team members would go here - using placeholders */}
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="text-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={`https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg`} 
                      alt="Team member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg">Nom Prénom</h3>
                  <p className="text-gray-600">Fonction</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default About;
