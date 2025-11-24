import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Phone, Clock, MessageCircle, Shield, Stethoscope, Pill } from "lucide-react";

const services = [
  {
    icon: Pill,
    title: "Médicaments",
    description: "Questions sur vos traitements, posologie, effets secondaires ou interactions médicamenteuses.",
  },
  {
    icon: Stethoscope,
    title: "Conseils santé",
    description: "Petits maux du quotidien, prévention, vaccination, hygiène de vie.",
  },
  {
    icon: Shield,
    title: "Automédication",
    description: "Aide au choix des médicaments sans ordonnance adaptés à vos symptômes.",
  },
];

const Conseil = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader
        title="Conseil téléphonique"
        description="Un pharmacien à votre écoute pour répondre à toutes vos questions de santé."
        image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=400&fit=crop"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* CTA principal */}
            <div className="bg-gradient-primary rounded-2xl p-8 text-center text-white mb-12">
              <Phone className="h-16 w-16 mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl font-bold mb-2">Appelez-nous maintenant</h2>
              <p className="text-white/80 mb-6">
                Un pharmacien diplômé répond à vos questions
              </p>
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <a href="tel:0467277555" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  04 67 27 75 55
                </a>
              </Button>
            </div>

            {/* Horaires */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Horaires du conseil téléphonique</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-accent rounded-lg p-4">
                  <p className="font-medium text-foreground">Lundi - Vendredi</p>
                  <p className="text-muted-foreground">9h00 - 19h30</p>
                </div>
                <div className="bg-accent rounded-lg p-4">
                  <p className="font-medium text-foreground">Samedi</p>
                  <p className="text-muted-foreground">9h00 - 19h30</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                En dehors de ces horaires, consultez la liste des pharmacies de garde sur le site de l'Ordre des Pharmaciens.
              </p>
            </div>

            {/* Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground text-center mb-8">
                Nos pharmaciens vous conseillent sur
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={service.title}
                      className="bg-card rounded-2xl p-6 shadow-card border border-border text-center"
                    >
                      <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Informations importantes */}
            <div className="bg-accent rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <MessageCircle className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Important</h3>
                  <p className="text-sm text-muted-foreground">
                    Le conseil téléphonique ne remplace pas une consultation médicale. Pour toute urgence médicale, 
                    appelez le 15 (SAMU) ou le 112 (numéro d'urgence européen). En cas de symptômes graves ou 
                    persistants, consultez votre médecin traitant.
                  </p>
                </div>
              </div>
            </div>

            {/* Avantages */}
            <div className="mt-12 grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">Gratuit</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">Confidentiel</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">Professionnel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Conseil;
