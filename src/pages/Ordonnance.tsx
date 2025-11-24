import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, FileText, MapPin, Clock } from "lucide-react";

const Ordonnance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader
        title="Ordonnance en ligne"
        description="Envoyez votre ordonnance et récupérez vos médicaments en pharmacie"
        image="https://images.unsplash.com/photo-1576671081837-49000212a370?w=1200&h=400&fit=crop"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
                <FileText className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Comment ça marche ?</h3>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Prenez votre ordonnance en photo ou scannez-la</li>
                  <li>Remplissez le formulaire ci-dessous</li>
                  <li>Nous préparons vos médicaments</li>
                  <li>Retirez votre commande en pharmacie</li>
                </ol>
              </div>

              <div className="bg-accent rounded-2xl p-6 border border-border">
                <Clock className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Délai de préparation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Votre ordonnance sera préparée dans les <strong className="text-foreground">2 heures</strong> suivant votre demande pendant nos horaires d'ouverture.
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Horaires :</p>
                  <p>Lundi - Samedi : 9h - 19h30</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border shadow-card">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Envoyer mon ordonnance
              </h2>

              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input id="lastName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input id="firstName" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ordonnance">Votre ordonnance *</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Cliquez pour ajouter votre ordonnance
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Format acceptés : JPG, PNG, PDF (max 5Mo)
                      </p>
                      <Input
                        id="ordonnance"
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Préférence médicaments</Label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="generiques" defaultChecked />
                        <Label htmlFor="generiques" className="font-normal cursor-pointer">
                          Accepte les génériques
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="originaux" />
                        <Label htmlFor="originaux" className="font-normal cursor-pointer">
                          Originaux uniquement
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comments">Commentaire (optionnel)</Label>
                    <Textarea
                      id="comments"
                      placeholder="Informations complémentaires..."
                      rows={4}
                    />
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground mb-1">Retrait en pharmacie uniquement</p>
                      <p className="text-muted-foreground">
                        Les médicaments sur ordonnance ne peuvent pas être livrés. Vous devrez les retirer à la pharmacie avec votre ordonnance originale et votre carte vitale.
                      </p>
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Envoyer mon ordonnance
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  En envoyant votre ordonnance, vous acceptez nos conditions générales de vente
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ordonnance;
