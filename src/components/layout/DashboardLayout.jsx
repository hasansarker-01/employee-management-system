import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 z-40">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Fixed Header */}
        <div className="fixed top-0 right-0 left-64 h-16 z-30">
          <Header />
        </div>

        {/* Page Content */}
        <main className="pt-16 min-h-screen">
          <div className="w-full flex justify-center">
            <div className="w-full max-w-7xl px-6 py-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
