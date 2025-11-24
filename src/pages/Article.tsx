import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useArticle, useLatestArticles } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link, useParams } from "react-router-dom";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = useArticle(slug || '');
  const { data: latestArticles } = useLatestArticles(3);

  const relatedArticles = latestArticles?.filter(a => a.slug !== slug).slice(0, 2);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="aspect-video w-full rounded-2xl mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Article non trouvé</h1>
            <p className="text-muted-foreground mb-6">
              L'article que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au blog
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Navigation */}
            <Button asChild variant="ghost" className="mb-6">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au blog
              </Link>
            </Button>

            {/* Header de l'article */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                {article.published_at && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(article.published_at), "d MMMM yyyy", { locale: fr })}
                    </span>
                  </div>
                )}
                {article.author && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                )}
                {article.category && (
                  <Badge variant="secondary">{article.category}</Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="text-lg text-muted-foreground">
                  {article.excerpt}
                </p>
              )}
            </header>

            {/* Image principale */}
            {article.image && (
              <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Contenu */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Partage */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Partager cet article</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: article.title,
                        text: article.excerpt || '',
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Articles connexes */}
      {relatedArticles && relatedArticles.length > 0 && (
        <section className="py-12 bg-accent">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8">Articles connexes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/blog/${relatedArticle.slug}`}
                    className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-hover transition-all"
                  >
                    {relatedArticle.image && (
                      <div className="aspect-video overflow-hidden bg-muted">
                        <img
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      {relatedArticle.published_at && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {format(new Date(relatedArticle.published_at), "d MMMM yyyy", { locale: fr })}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ArticlePage;
