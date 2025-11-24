import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, ShoppingBag, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: ShoppingBag,
    title: "1. Passez votre commande",
    description: "Sélectionnez vos produits et validez votre commande en ligne",
  },
  {
    icon: Clock,
    title: "2. Préparation rapide",
    description: "Votre commande est préparée en 20 minutes par nos pharmaciens",
  },
  {
    icon: CheckCircle,
    title: "3. Notification SMS",
    description: "Vous recevez un SMS dès que votre commande est prête",
  },
  {
    icon: MapPin,
    title: "4. Retrait en pharmacie",
    description: "Retirez votre commande à l'accueil de la pharmacie",
  },
];

const ClickCollect = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader
        title="Click & Collect"
        description="Commandez en ligne et retirez votre commande en 20 minutes à la pharmacie"
        image="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1200&h=400&fit=crop"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <Clock className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Service Click & Collect en 20 minutes
              </h2>
              <p className="text-lg text-muted-foreground">
                Gagnez du temps avec notre service de retrait rapide en pharmacie
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="bg-card rounded-2xl p-6 border border-border shadow-card"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-accent rounded-2xl p-8 border border-border mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Informations pratiques
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Adresse</p>
                    <p>Pharmacie Maurin - 1479 Avenue de Maurin, 34070 Montpellier</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Horaires de retrait</p>
                    <p>Lundi - Samedi : 9h - 19h30</p>
                    <p>Dimanche : Fermé</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <a href="/pharmacie">Commencer mes achats</a>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Service gratuit • Commande prête en 20 minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClickCollect;
