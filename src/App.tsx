import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pharmacie from "./pages/Pharmacie";
import Parapharmacie from "./pages/Parapharmacie";
import BebeMaman from "./pages/BebeMaman";
import Veterinaire from "./pages/Veterinaire";
import Promotions from "./pages/Promotions";
import ClickCollect from "./pages/ClickCollect";
import Ordonnance from "./pages/Ordonnance";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Legal from "./pages/Legal";
import CGV from "./pages/CGV";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";
import Conseil from "./pages/Conseil";
import Blog from "./pages/Blog";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pharmacie" element={<Pharmacie />} />
          <Route path="/parapharmacie" element={<Parapharmacie />} />
          <Route path="/bebe-maman" element={<BebeMaman />} />
          <Route path="/veterinaire" element={<Veterinaire />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/click-collect" element={<ClickCollect />} />
          <Route path="/ordonnance" element={<Ordonnance />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/conseil" element={<Conseil />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
