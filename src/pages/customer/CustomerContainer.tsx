import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router"
import Landing from '/assets/img/customer-landing.png'

const CustomerContainer = () => {
    const RequestPage = lazy(() => import("./AllRequest"))
    const CustomerReportPage = lazy(() => import("./CustomerReport"))
    const CustomerNewRequestPage = lazy(() => import("./NewRequest"))
    const CustomerActionRequestPage = lazy(() => import("./ActionRequest"))
  return (
    <div className="mt-20">
      <Suspense fallback={<div>
        <img src={Landing} alt="" />
      </div>}>
        <Routes>
            <Route path="" element={<div><img src={Landing} alt="" /></div>} />
            <Route path="/pending-request" element={<RequestPage />} />
            <Route path="/report" element={<CustomerReportPage />} />
            <Route path="/new-request" element={<CustomerNewRequestPage />} />
            <Route path="/action-request" element={<CustomerActionRequestPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default CustomerContainer
