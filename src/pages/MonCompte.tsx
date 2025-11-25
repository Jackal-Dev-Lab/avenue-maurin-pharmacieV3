import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores/authStore";
import { useOrdonnanceStore } from "@/stores/ordonnanceStore";
import { useNavigate, Link } from "react-router-dom";
import { User, Package, FileText, Settings, Loader2, Save, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";

const MonCompte = () => {
  const { isAuthenticated, profile, updateProfile, isLoading: authLoading } = useAuthStore();
  const { ordonnances, fetchUserOrdonnances, isLoading: ordonnancesLoading } = useOrdonnanceStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        street: profile.address?.street || "",
        city: profile.address?.city || "",
        zip: profile.address?.zip || "",
      });
      fetchUserOrdonnances(profile.id);
    }
  }, [profile, fetchUserOrdonnances]);

  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await updateProfile({
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        zip: formData.zip,
      },
    });

    if (error) {
      toast({
        title: "Erreur",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées",
      });
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
      processing: { label: "En préparation", className: "bg-blue-100 text-blue-800" },
      ready: { label: "Prête", className: "bg-green-100 text-green-800" },
      completed: { label: "Retirée", className: "bg-gray-100 text-gray-800" },
      cancelled: { label: "Annulée", className: "bg-red-100 text-red-800" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Mon compte</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos informations personnelles et suivez vos ordonnances
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="ordonnances" className="gap-2">
              <FileText className="h-4 w-4" />
              Ordonnances
            </TabsTrigger>
            <TabsTrigger value="commandes" className="gap-2">
              <Package className="h-4 w-4" />
              Commandes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Modifiez vos informations de contact et d'adresse
                  </CardDescription>
                </div>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Modifier
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">Prénom</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Nom</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        value={profile?.email || ""}
                        disabled
                        className="pl-10 bg-muted"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="font-medium mb-4 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Adresse
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">Rue</Label>
                      <Input
                        id="street"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        disabled={!isEditing}
                        placeholder="1 rue de la Paix"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          disabled={!isEditing}
                          placeholder="Montpellier"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">Code postal</Label>
                        <Input
                          id="zip"
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          disabled={!isEditing}
                          placeholder="34000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ordonnances">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Mes ordonnances</CardTitle>
                    <CardDescription>
                      Suivez l'état de vos ordonnances envoyées
                    </CardDescription>
                  </div>
                  <Button asChild>
                    <Link to="/ordonnance">Envoyer une ordonnance</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {ordonnancesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : ordonnances.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Aucune ordonnance envoyée</p>
                    <Button asChild className="mt-4">
                      <Link to="/ordonnance">Envoyer ma première ordonnance</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {ordonnances.map((ordonnance) => (
                      <div
                        key={ordonnance.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">Ordonnance #{ordonnance.id.slice(-6)}</p>
                          <p className="text-sm text-muted-foreground">
                            Envoyée le {formatDate(ordonnance.created_at)}
                          </p>
                          {ordonnance.doctor_name && (
                            <p className="text-sm text-muted-foreground">
                              Dr. {ordonnance.doctor_name}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          {getStatusBadge(ordonnance.status)}
                          {ordonnance.pickup_date && ordonnance.status === 'ready' && (
                            <p className="text-xs text-muted-foreground mt-1">
                              À retirer avant le {formatDate(ordonnance.pickup_date)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commandes">
            <Card>
              <CardHeader>
                <CardTitle>Mes commandes</CardTitle>
                <CardDescription>
                  Historique de vos commandes Click & Collect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucune commande pour le moment</p>
                  <Button asChild className="mt-4">
                    <Link to="/pharmacie">Découvrir nos produits</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default MonCompte;
