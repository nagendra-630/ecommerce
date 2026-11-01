import React from 'react';
import { useAmazon } from '../context/AmazonContext';
import { 
  X, 
  User, 
  ChevronRight, 
  Tv, 
  Headphones, 
  BookOpen, 
  Cpu, 
  Laptop, 
  Home, 
  Tag, 
  Gift, 
  HelpCircle, 
  Settings,
  ShoppingBag
} from 'lucide-react';

export const SideDrawer: React.FC = () => {
  const { 
    isSideDrawerOpen, 
    setIsSideDrawerOpen, 
    user, 
    setActiveView, 
    setSearchCategory, 
    executeSearch 
  } = useAmazon();

  if (!isSideDrawerOpen) return null;

  const handleDepartmentClick = (dept: string) => {
    setSearchCategory(dept);
    executeSearch('', dept);
    setIsSideDrawerOpen(false);
  };

  const handleNavClick = (view: any) => {
    setActiveView(view);
    setIsSideDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dark backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsSideDrawerOpen(false)}
      />

      {/* Drawer panel */}
      <div className="relative w-80 sm:w-96 bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250 ease-out">
        {/* Drawer Header */}
        <div className="bg-[#232f3e] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold block">Hello, {user.name}</span>
              <span className="text-xs text-yellow-400 font-semibold">Prime Member</span>
            </div>
          </div>
          <button
            onClick={() => setIsSideDrawerOpen(false)}
            className="p-1 rounded-full hover:bg-white/10 text-gray-300 hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-200 text-sm text-gray-800">
          {/* Digital Content & Devices */}
          <div className="py-3">
            <h3 className="px-5 py-2 font-bold text-gray-900 text-base">Digital Content & Devices</h3>
            <ul>
              <li>
                <button
                  onClick={() => handleNavClick('deals')}
                  className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="flex items-center gap-3">
                    <Tv className="w-4 h-4 text-gray-500" />
                    Prime Video
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDepartmentClick('Electronics')}
                  className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="flex items-center gap-3">
                    <Headphones className="w-4 h-4 text-gray-500" />
                    Amazon Music & Audio
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDepartmentClick('Electronics')}
                  className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    Kindle E-readers & Books
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Shop By Department */}
          <div className="py-3">
            <h3 className="px-5 py-2 font-bold text-gray-900 text-base">Shop By Department</h3>
            <ul>
              <li>
                <button
                  onClick={() => handleDepartmentClick('Electronics')}
                  className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-gray-500" />
                    Electronics & Gadgets
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDepartmentClick('Computers')}
                  className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="flex items-center gap-3">
                    <Laptop className="w-4 h-4 text-gray-500" />
                    Computers & Laptops
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDepartmentClick('Smart Home')}
                  className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-gray-500" />
                    Smart Home & Automation
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDepartmentClick('Home & Kitchen')}
                  className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-gray-500" />
                    Home, Kitchen & Cookware
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Programs & Features */}
          <div className="py-3">
            <h3 className="px-5 py-2 font-bold text-gray-900 text-base">Programs & Features</h3>
            <ul>
              <li>
                <button
                  onClick={() => handleNavClick('deals')}
                  className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="flex items-center gap-3">
                    <Tag className="w-4 h-4 text-red-600" />
                    Today's Deals
                  </span>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Hot</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('wishlist')}
                  className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="flex items-center gap-3">
                    <Gift className="w-4 h-4 text-gray-500" />
                    Wish List & Registry
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Help & Settings */}
          <div className="py-3">
            <h3 className="px-5 py-2 font-bold text-gray-900 text-base">Help & Settings</h3>
            <ul>
              <li>
                <button
                  onClick={() => handleNavClick('orders')}
                  className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="flex items-center gap-3">
                    <Settings className="w-4 h-4 text-gray-500" />
                    Your Account & Orders
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('orders')}
                  className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-gray-500" />
                    Customer Service & Returns
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
