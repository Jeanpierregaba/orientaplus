
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">Orienta+</h3>
            <p className="text-gray-600">
              Votre plateforme d'orientation académique et professionnelle pour construire votre avenir en Afrique.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-orienta-dark-green">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-orienta-dark-green">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-orienta-dark-green">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-600 hover:text-orienta-dark-green">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-orienta-dark-green">Accueil</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-orienta-dark-green">À propos</Link>
              </li>
              <li>
                <Link to="/assessment" className="text-gray-600 hover:text-orienta-dark-green">Évaluation</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-orienta-dark-green">Métiers</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-orienta-dark-green">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-orienta-dark-green">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-orienta-dark-green">Confidentialité</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-orienta-dark-green">Conditions d'utilisation</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Contactez-nous</h4>
            <address className="not-italic text-gray-600 space-y-2">
              <p>Email: contact@orientaplus.com</p>
              <p>Téléphone: +xxx xxx xxx xxx</p>
              <p>Adresse: Lorem ipsum dolor sit amet, consectetur</p>
            </address>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Orienta+. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
