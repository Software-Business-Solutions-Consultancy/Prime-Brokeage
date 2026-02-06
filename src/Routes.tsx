import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

const Auth = lazy(() => import('./pages/Auth'));
const CustomerPages = lazy(() => import('./pages/customer/CustomerLayout'));
const InbranchPages = lazy(() => import('./pages/inbranch/InbranchLayout'));
const OperationsPages = lazy(() => import('./pages/operation/OperationsLayout'));

const Router = () => {
  // const role = {
  //   GMT: 'GMT',
  //   TROPS: 'TROPS',
  // };
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Auth />} />
        <Route path="customer/*" element={<CustomerPages />} />
        <Route path="gmt/*" element={<InbranchPages />} />
        {/* <Route path="in-branch/*" element={<InbranchPages />} /> */}
        <Route path="operations/*" element={<OperationsPages />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
