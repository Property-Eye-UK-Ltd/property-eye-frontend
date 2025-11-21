import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import OTPVerification from "./pages/auth/OTPVerification";
import AgencyOwnerInfo from "./pages/auth/AgencyOwnerInfo";
import AgencyInformation from "./pages/auth/AgencyInformation";
import { AuthFlowLayout } from "./components/auth/AuthFlowLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />

          {/* Auth Flow Routes with Persistent Layout */}
          <Route element={<AuthFlowLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/agency-owner-info" element={<AgencyOwnerInfo />} />
            <Route path="/agency-information" element={<AgencyInformation />} />
          </Route>
          {/* Redirect root to login for now, or keep Index as landing page */}
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
