import React from 'react';
import { AmazonProvider, useAmazon } from './context/AmazonContext';
import { Header } from './components/Header';
import { SubNav } from './components/SubNav';
import { SideDrawer } from './components/SideDrawer';
import { DeliveryModal } from './components/DeliveryModal';
import { TrackingModal } from './components/TrackingModal';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { OrdersView } from './components/OrdersView';
import { DealsView } from './components/DealsView';
import { OrderConfirmationView } from './components/OrderConfirmationView';
import { WishlistView } from './components/WishlistView';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

const MainContent: React.FC = () => {
  const { activeView } = useAmazon();

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'search':
        return <CatalogView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'orders':
        return <OrdersView />;
      case 'deals':
        return <DealsView />;
      case 'order-confirmation':
        return <OrderConfirmationView />;
      case 'wishlist':
        return <WishlistView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eaeded] font-sans antialiased text-gray-900 selection:bg-[#febd69] selection:text-gray-950">
      {/* Header and SubNav are shown on all views except Checkout for clean checkout experience */}
      {activeView !== 'checkout' && (
        <>
          <Header />
          <SubNav />
        </>
      )}

      {/* Main Dynamic View */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Footer is shown on all views except Checkout */}
      {activeView !== 'checkout' && <Footer />}

      {/* Global Modals & Drawers */}
      <SideDrawer />
      <DeliveryModal />
      <TrackingModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AmazonProvider>
      <MainContent />
    </AmazonProvider>
  );
}
