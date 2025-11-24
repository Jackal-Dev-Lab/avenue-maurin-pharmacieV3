import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { usePage } from "@/hooks/usePages";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Award, Heart, Clock } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Proximité",
    description: "Un accueil chaleureux et personnalisé pour chacun de nos clients",
  },
  {
    icon: Award,
    title: "Expertise",
    description: "Des conseils pharmaceutiques de qualité par notre équipe qualifiée",
  },
  {
    icon: Users,
    title: "Accessibilité",
    description: "Des prix justes et des services adaptés à tous les besoins",
  },
  {
    icon: Clock,
    title: "Innovation",
    description: "Des outils modernes pour votre confort : Click & Collect, ordonnance en ligne",
  },
];

const About = () => {
  const { data: page, isLoading } = usePage('about');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader
        title="Qui sommes-nous"
        description="Découvrez l'histoire et l'équipe de la Pharmacie Maurin, votre pharmacie de confiance à Montpellier depuis plus de 30 ans."
        image="https://images.unsplash.com/photo-1576671081837-49000212a370?w=1200&h=400&fit=crop"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Valeurs */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-card rounded-2xl p-6 shadow-card border border-border text-center"
                >
                  <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>

          {/* Contenu de la page */}
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-8 w-1/2 mt-8" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : page ? (
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, '<br />') }}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Contenu non disponible</p>
              </div>
            )}
          </div>

          {/* Équipe */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Notre équipe</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
                <div className="aspect-square bg-accent">
                  <img
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
                    alt="Pharmacien titulaire"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-foreground">Dr. Jean Maurin</h3>
                  <p className="text-sm text-primary">Pharmacien titulaire</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    30 ans d'expérience au service de votre santé
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
                <div className="aspect-square bg-accent">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
                    alt="Pharmacien adjoint"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-foreground">Dr. Marie Dupont</h3>
                  <p className="text-sm text-primary">Pharmacien adjoint</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Spécialisée en dermocosmétique et nutrition
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border sm:col-span-2 lg:col-span-1">
                <div className="aspect-square bg-accent">
                  <img
                    src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop"
                    alt="Équipe de préparateurs"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-foreground">Notre équipe</h3>
                  <p className="text-sm text-primary">Préparateurs en pharmacie</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Des professionnels qualifiés à votre service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
