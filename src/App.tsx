
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Launch from "./pages/Launch";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Chat from "./pages/Chat";
import Marketplace from "./pages/Marketplace";
import Payment from "./pages/Payment";
import LawyerChat from "./pages/LawyerChat";
import DocumentPreview from "./pages/DocumentPreview";
import CaseStudy from "./pages/CaseStudy";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Launch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/lawyer-chat" element={<LawyerChat />} />
          <Route path="/document-preview" element={<DocumentPreview />} />
          <Route path="/original" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
