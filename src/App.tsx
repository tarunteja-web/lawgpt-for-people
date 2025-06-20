
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Call from "./pages/Call";
import Marketplace from "./pages/Marketplace";
import Payment from "./pages/Payment";
import LawyerChat from "./pages/LawyerChat";
import LawyerCall from "./pages/LawyerCall";
import LawyerVideoCall from "./pages/LawyerVideoCall";
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
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/call" element={<Call />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/lawyer-chat" element={<LawyerChat />} />
          <Route path="/lawyer-call" element={<LawyerCall />} />
          <Route path="/lawyer-video-call" element={<LawyerVideoCall />} />
          <Route path="/document-preview" element={<DocumentPreview />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/original" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
