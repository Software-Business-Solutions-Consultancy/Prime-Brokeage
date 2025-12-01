import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

const Auth = lazy(() => import('./pages/Auth'));
const CustomerPages = lazy(() => import('./pages/customer/CustomerLayout'));
// const TransporterPages = lazy(() => import('./pages/TransporterLayout'));
// const AdminPages = lazy(() => import('./pages/AdminLayout'));
// const FinanceManagerPages = lazy(() => import('./pages/FinanceManagerLayout'));
// const DisputeManagerPages = lazy(() => import('./pages/DisputeManagerLayout'));
// const SalesManagerPages = lazy(() => import('./pages/SalesManagerLayout'));

const Router = () => {
  // const role = {
  //   ADMIN: 'ADMIN',
  //   LOGISTICS_MGR: 'LOGISTICS_MGR',
  //   TRANSPORTER: 'TRANSPORTER',
  //   CUSTOMER: 'CUSTOMER',
  //   DISPUTE_MANAGER: 'DISPUTE_MANAGER',
  //   SALES_MANAGER: 'SALES_MANAGER',
  // };
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Auth />} />
        <Route path="customer/*" element={<CustomerPages />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
