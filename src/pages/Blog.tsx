import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { useArticles } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";

const Blog = () => {
  const { data: articles, isLoading } = useArticles();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader
        title="Blog & Actualités"
        description="Conseils santé, actualités de la pharmacie et informations utiles pour votre bien-être."
        image="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&h=400&fit=crop"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-hover transition-all"
                >
                  {article.image && (
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      {article.published_at && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {format(new Date(article.published_at), "d MMMM yyyy", { locale: fr })}
                          </span>
                        </div>
                      )}
                      {article.category && (
                        <Badge variant="secondary">{article.category}</Badge>
                      )}
                    </div>
                    
                    <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    
                    {article.excerpt && (
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      {article.author && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                      )}
                      <span className="flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                        Lire la suite
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun article pour le moment</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
