import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Signup from "./pages/auth/Signup";
import OTPVerification from "./pages/auth/OTPVerification";
import AgencyOwnerInfo from "./pages/auth/AgencyOwnerInfo";
import AgencyInformation from "./pages/auth/AgencyInformation";
import { AuthFlowLayout } from "./components/auth/AuthFlowLayout";
import Overview from "./pages/dashboard/Overview";
import CaseManagement from "./pages/dashboard/CaseManagement";
import CaseDetails from "./pages/dashboard/CaseDetails";
import Analytics from "./pages/dashboard/Analytics";

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
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Auth Flow Routes with Persistent Layout */}
          <Route element={<AuthFlowLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/agency-owner-info" element={<AgencyOwnerInfo />} />
            <Route path="/agency-information" element={<AgencyInformation />} />
          </Route>

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/dashboard/cases" element={<CaseManagement />} />
          <Route path="/dashboard/cases/:caseId" element={<CaseDetails />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
