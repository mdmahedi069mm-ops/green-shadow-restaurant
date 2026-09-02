import React, { useEffect } from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { StickyMobileBar } from './components/layout/StickyMobileBar';
import { HomePage } from './components/pages/HomePage';
import { MenuPage } from './components/pages/MenuPage';
import { ReservationPage } from './components/pages/ReservationPage';
import { EventsPage } from './components/pages/EventsPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { AboutPage } from './components/pages/AboutPage';
import { LocationPage } from './components/pages/LocationPage';
import { ReviewsPage } from './components/pages/ReviewsPage';
import { FaqPage } from './components/pages/FaqPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPolicyPage, TermsPage } from './components/pages/LegalPages';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { OrderTrackingPage } from './components/pages/OrderTrackingPage';
import { CustomerProfilePage } from './components/pages/CustomerProfilePage';
import { CartDrawer } from './components/cart/CartDrawer';
import { DishCustomizerModal } from './components/menu/DishCustomizerModal';
import { AuthModal } from './components/auth/AuthModal';
import { ToastContainer } from './components/ui/ToastContainer';
import { DishDetailModal, LightboxModal } from './components/ui/Modals';

const AppContent: React.FC = () => {
  const { currentPage } = useRestaurant();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'menu':
        return <MenuPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'tracking':
        return <OrderTrackingPage />;
      case 'profile':
        return <CustomerProfilePage />;
      case 'reservation':
        return <ReservationPage />;
      case 'events':
        return <EventsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'about':
        return <AboutPage />;
      case 'location':
        return <LocationPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'faq':
        return <FaqPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-emerald-900 selection:text-amber-300">
      {/* Top Header */}
      <Header />

      {/* Main Dynamic View */}
      <main className="flex-1 pb-20 md:pb-0">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Mobile Bottom Navigation Bar */}
      <StickyMobileBar />

      {/* E-Commerce Modals & Drawers */}
      <CartDrawer />
      <DishCustomizerModal />
      <AuthModal />

      {/* Global Modals & Notifications */}
      <DishDetailModal />
      <LightboxModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <RestaurantProvider>
      <AppContent />
    </RestaurantProvider>
  );
}

export default App;
