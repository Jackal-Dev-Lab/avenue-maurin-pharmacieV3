import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useOrdonnanceStore } from "@/stores/ordonnanceStore";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, MapPin, Clock, X, Check, Loader2, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Ordonnance = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createOrdonnance } = useOrdonnanceStore();
  const { isAuthenticated, profile } = useAuthStore();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ordonnanceId, setOrdonnanceId] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    lastName: profile?.last_name || "",
    firstName: profile?.first_name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    doctorName: "",
    comments: "",
    acceptGenerics: true,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.size <= 5 * 1024 * 1024 // 5MB max
    );

    if (validFiles.length !== selectedFiles.length) {
      toast({
        title: "Fichiers trop volumineux",
        description: "Certains fichiers dépassent la limite de 5Mo",
        variant: "destructive",
      });
    }

    setFiles((prev) => [...prev, ...validFiles]);

    // Créer les prévisualisations
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      toast({
        title: "Ordonnance manquante",
        description: "Veuillez ajouter votre ordonnance",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simuler l'upload des fichiers (dans une vraie app, on uploaderait vers Supabase Storage)
    const imageUrls = previews; // En production : upload vers Supabase Storage

    const { id, error } = await createOrdonnance({
      user_id: profile?.id,
      patient_name: `${formData.firstName} ${formData.lastName}`,
      patient_email: formData.email,
      patient_phone: formData.phone,
      doctor_name: formData.doctorName || undefined,
      notes: formData.comments || undefined,
      image_urls: imageUrls,
    });

    if (error) {
      toast({
        title: "Erreur",
        description: error,
        variant: "destructive",
      });
    } else {
      setIsSuccess(true);
      setOrdonnanceId(id || null);
      toast({
        title: "Ordonnance envoyée",
        description: "Nous vous contacterons très bientôt",
      });
    }

    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Ordonnance envoyée !</h1>
            <p className="text-muted-foreground mb-8">
              Votre ordonnance a bien été reçue. Notre équipe va la vérifier et préparer vos médicaments. Vous recevrez un email de confirmation.
            </p>
            
            {ordonnanceId && (
              <div className="bg-accent rounded-lg p-4 mb-8">
                <p className="text-sm text-muted-foreground">
                  Numéro de suivi : <span className="font-mono font-medium text-foreground">{ordonnanceId}</span>
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-4 text-left">
                <h3 className="font-medium mb-2">Prochaines étapes :</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                    Nous vérifions votre ordonnance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                    Nous préparons vos médicaments (sous 2h)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                    Vous recevez un SMS quand c'est prêt
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                    Vous venez retirer avec votre ordonnance originale
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild variant="outline">
                <Link to="/">Retour à l'accueil</Link>
              </Button>
              {isAuthenticated && (
                <Button asChild>
                  <Link to="/mon-compte">Suivre mes ordonnances</Link>
                </Button>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input 
                        id="lastName" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input 
                        id="firstName" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="06 12 34 56 78"
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctorName">Nom du médecin (optionnel)</Label>
                    <Input 
                      id="doctorName" 
                      value={formData.doctorName}
                      onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                      placeholder="Dr. Martin"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Votre ordonnance *</Label>
                    <div 
                      className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Cliquez pour ajouter votre ordonnance
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Format acceptés : JPG, PNG, PDF (max 5Mo)
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,.pdf"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>

                    {/* Prévisualisation des fichiers */}
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {files.map((file, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-3 p-3 bg-accent rounded-lg"
                          >
                            {file.type.startsWith('image/') && previews[index] ? (
                              <img
                                src={previews[index]}
                                alt={file.name}
                                className="h-12 w-12 object-cover rounded"
                              />
                            ) : (
                              <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                                <ImageIcon className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} Mo
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Préférence médicaments</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="generiques" 
                        checked={formData.acceptGenerics}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, acceptGenerics: checked as boolean })
                        }
                      />
                      <Label htmlFor="generiques" className="font-normal cursor-pointer">
                        Accepte les génériques (recommandé, moins cher)
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comments">Commentaire (optionnel)</Label>
                    <Textarea
                      id="comments"
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      placeholder="Informations complémentaires, allergies connues..."
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

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer mon ordonnance"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  En envoyant votre ordonnance, vous acceptez nos{" "}
                  <Link to="/cgv" className="underline">conditions générales de vente</Link>
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
