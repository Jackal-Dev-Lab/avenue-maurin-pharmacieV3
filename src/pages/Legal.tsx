import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { usePage } from "@/hooks/usePages";
import { Skeleton } from "@/components/ui/skeleton";

const Legal = () => {
  const { data: page, isLoading } = usePage('legal');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader
        title="Mentions légales"
        description="Informations juridiques et réglementaires concernant le site de la Pharmacie Maurin."
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 shadow-card border border-border">
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Legal;
