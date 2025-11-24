import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { useFAQ, useFAQCategories } from "@/hooks/useFAQ";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HelpCircle, Phone, Mail } from "lucide-react";

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const { data: faqItems, isLoading } = useFAQ(selectedCategory);
  const { data: categories } = useFAQCategories();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader
        title="Questions fréquentes"
        description="Retrouvez les réponses aux questions les plus fréquemment posées sur nos services."
        image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=400&fit=crop"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Filtres par catégorie */}
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                <Button
                  variant={selectedCategory === undefined ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(undefined)}
                >
                  Toutes
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}

            {/* Liste des questions */}
            <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              ) : faqItems && faqItems.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={item.id} value={item.id} className="border-b border-border last:border-0">
                      <AccordionTrigger className="px-6 py-4 hover:bg-accent/50 text-left">
                        <div className="flex items-start gap-3">
                          <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="font-medium text-foreground">{item.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="pl-8 text-muted-foreground">
                          {item.answer}
                        </div>
                        {item.category && (
                          <div className="pl-8 mt-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                              {item.category}
                            </span>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="p-12 text-center">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucune question trouvée pour cette catégorie</p>
                </div>
              )}
            </div>

            {/* Contact */}
            <div className="mt-12 bg-gradient-hero rounded-2xl p-8 text-center">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Vous n'avez pas trouvé votre réponse ?
              </h2>
              <p className="text-muted-foreground mb-6">
                Notre équipe est à votre disposition pour répondre à toutes vos questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="default">
                  <a href="tel:0467277555" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    04 67 27 75 55
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/contact" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Nous contacter
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
