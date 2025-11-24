import { Shield, Truck, Award, HeartHandshake } from "lucide-react";

const signals = [
  {
    icon: Shield,
    title: "Paiement sécurisé",
    description: "Vos transactions sont protégées",
  },
  {
    icon: Truck,
    title: "Livraison rapide",
    description: "Expédition sous 24h",
  },
  {
    icon: Award,
    title: "Pharmacie certifiée",
    description: "Agréée par l'ARS",
  },
  {
    icon: HeartHandshake,
    title: "Conseil personnalisé",
    description: "Des pharmaciens à votre écoute",
  },
];

export const TrustSignals = () => {
  return (
    <section className="py-12 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {signals.map((signal) => {
            const Icon = signal.icon;
            return (
              <div key={signal.title} className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 text-sm">
                  {signal.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {signal.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
