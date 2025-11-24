import { Clock, FileText, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Clock,
    title: "Click & Collect 20 min",
    description: "Commandez en ligne et retirez votre commande en pharmacie en 20 minutes",
    cta: "Commander",
    link: "/click-collect",
    color: "primary",
  },
  {
    icon: FileText,
    title: "Ordonnance en ligne",
    description: "Envoyez votre ordonnance et récupérez vos médicaments en pharmacie",
    cta: "Envoyer mon ordonnance",
    link: "/ordonnance",
    color: "trust",
  },
  {
    icon: Phone,
    title: "Conseil téléphonique",
    description: "Un pharmacien vous conseille par téléphone du lundi au samedi",
    cta: "04 67 27 75 55",
    link: "tel:0467277555",
    color: "accent",
  },
];

export const HeroServices = () => {
  return (
    <section className="py-12 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Nos services pour votre santé
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Profitez de nos services en ligne pour gagner du temps et bénéficier de conseils personnalisés
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all border border-border"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {service.description}
                  </p>
                  <Button
                    asChild
                    variant={service.color === "primary" ? "default" : "outline"}
                    className="w-full"
                  >
                    <a href={service.link}>{service.cta}</a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
