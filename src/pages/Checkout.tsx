import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { formatPrice } from "@/lib/utils";
import { useNavigate, Link } from "react-router-dom";
import { 
  MapPin, 
  Clock, 
  CreditCard, 
  ShoppingBag, 
  ArrowLeft, 
  Check,
  Store,
  User,
  Mail,
  Phone,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated, profile } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"info" | "confirmation">("info");
  const [pickupTime, setPickupTime] = useState("asap");
  const [paymentMethod, setPaymentMethod] = useState("store");
  
  const [formData, setFormData] = useState({
    firstName: profile?.first_name || "",
    lastName: profile?.last_name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    notes: "",
  });

  const totalPrice = getTotalPrice();

  if (items.length === 0 && step === "info") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
            <p className="text-muted-foreground mb-6">
              Ajoutez des produits pour passer commande
            </p>
            <Button asChild>
              <Link to="/pharmacie">Voir nos produits</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler un délai d'envoi
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Succès
    setStep("confirmation");
    clearCart();
    setIsSubmitting(false);
  };

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Commande confirmée !</h1>
            <p className="text-muted-foreground mb-8">
              Votre commande a bien été enregistrée. Vous recevrez un email de confirmation avec les détails de retrait.
            </p>
            
            <Card className="text-left mb-8">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Store className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Pharmacie Maurin</p>
                      <p className="text-sm text-muted-foreground">
                        1479 Avenue de Maurin, 34070 Montpellier
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {pickupTime === "asap" ? "Dès que possible" : "Retrait programmé"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {pickupTime === "asap" 
                          ? "Généralement prêt en 20 minutes"
                          : "À l'horaire choisi"
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Paiement en pharmacie</p>
                      <p className="text-sm text-muted-foreground">
                        Par carte bancaire ou espèces
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to="/">Retour à l'accueil</Link>
              </Button>
              {isAuthenticated && (
                <Button asChild>
                  <Link to="/mon-compte">Voir mes commandes</Link>
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

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/pharmacie">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continuer mes achats
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-8">Finaliser ma commande</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informations personnelles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Vos informations
                  </CardTitle>
                  <CardDescription>
                    Pour vous contacter lors de la préparation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10"
                        placeholder="06 12 34 56 78"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Retrait */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Retrait en pharmacie
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-accent rounded-lg">
                    <div className="flex items-start gap-3">
                      <Store className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Pharmacie Maurin</p>
                        <p className="text-sm text-muted-foreground">
                          1479 Avenue de Maurin, 34070 Montpellier
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Lundi - Samedi : 9h - 19h30
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Quand souhaitez-vous retirer votre commande ?</Label>
                    <RadioGroup value={pickupTime} onValueChange={setPickupTime}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                        <RadioGroupItem value="asap" id="asap" />
                        <Label htmlFor="asap" className="flex-1 cursor-pointer">
                          <span className="font-medium">Dès que possible</span>
                          <span className="block text-sm text-muted-foreground">
                            Généralement prêt en 20 minutes
                          </span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                        <RadioGroupItem value="later" id="later" />
                        <Label htmlFor="later" className="flex-1 cursor-pointer">
                          <span className="font-medium">Planifier un horaire</span>
                          <span className="block text-sm text-muted-foreground">
                            Choisir une date et heure de retrait
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Paiement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Paiement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                      <RadioGroupItem value="store" id="store" />
                      <Label htmlFor="store" className="flex-1 cursor-pointer">
                        <span className="font-medium">Paiement en pharmacie</span>
                        <span className="block text-sm text-muted-foreground">
                          Par carte bancaire ou espèces au moment du retrait
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Notes (optionnel)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Instructions particulières pour votre commande..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Récapitulatif */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Qté : {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium shrink-0">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Retrait</span>
                      <span className="text-green-600">Gratuit</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(totalPrice)}</span>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Confirmer la commande
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    En confirmant, vous acceptez nos{" "}
                    <Link to="/cgv" className="underline">CGV</Link>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
