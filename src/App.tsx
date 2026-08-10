import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/AuthContext";
import { AdminGuard } from "@/components/AdminGuard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Servicios from "@/pages/Servicios";
import Credenciales from "@/pages/Credenciales";
import Blog from "@/pages/Blog";
import Nosotros from "@/pages/Nosotros";
import NotFound from "@/pages/NotFound";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminContactos from "@/pages/admin/AdminContactos";
import AdminCredenciales from "@/pages/admin/AdminCredenciales";

const queryClient = new QueryClient();

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes with Navbar + Footer */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/credenciales" element={<Credenciales />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin login (no guard) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin routes (protected) */}
            <Route
              path="/admin"
              element={
                <AdminGuard>
                  <AdminLayout />
                </AdminGuard>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="contactos" element={<AdminContactos />} />
              <Route path="credenciales" element={<AdminCredenciales />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
