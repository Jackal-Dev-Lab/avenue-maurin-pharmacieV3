import { MapPin, Phone, Mail, Clock } from "lucide-react";

const footerLinks = {
  "Informations": [
    { name: "Qui sommes-nous", link: "/about" },
    { name: "Mentions légales", link: "/legal" },
    { name: "CGV", link: "/cgv" },
    { name: "Politique de confidentialité", link: "/privacy" },
  ],
  "Services": [
    { name: "Click & Collect", link: "/click-collect" },
    { name: "Ordonnance en ligne", link: "/ordonnance" },
    { name: "Conseil téléphonique", link: "/conseil" },
    { name: "FAQ", link: "/faq" },
  ],
  "Nos univers": [
    { name: "Pharmacie en ligne", link: "/pharmacie" },
    { name: "Parapharmacie en ligne", link: "/parapharmacie" },
    { name: "Bébé & Maman", link: "/bebe-maman" },
    { name: "Vétérinaire", link: "/veterinaire" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <span className="text-xl">⚕️</span>
              </div>
              <div>
                <h3 className="font-bold text-foreground">Pharmacie Maurin</h3>
                <p className="text-xs text-muted-foreground">Montpellier</p>
              </div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">Adresse</p>
                  <p className="text-muted-foreground">
                    1479 Avenue de Maurin<br />
                    34070 Montpellier
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">Téléphone</p>
                  <a href="tel:0467277555" className="text-muted-foreground hover:text-primary">
                    04 67 27 75 55
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">Email</p>
                  <a href="mailto:contact@pharmacie-maurin.fr" className="text-muted-foreground hover:text-primary">
                    contact@pharmacie-maurin.fr
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">Horaires</p>
                  <p className="text-muted-foreground">
                    Lun - Sam : 9h - 19h30<br />
                    Dimanche : Fermé
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.link}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 Pharmacie Maurin. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <img src="https://www.ordre.pharmacien.fr/extension/ordre_theme/design/standard/images/logo-ordre.svg" alt="Ordre des Pharmaciens" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
              <span className="text-xs text-muted-foreground">Pharmacie agréée ARS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
