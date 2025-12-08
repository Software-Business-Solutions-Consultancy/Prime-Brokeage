import { lazy, Suspense } from 'react'
import { Routes, Route } from "react-router"
import Landing from '/assets/img/customer-landing.png'

const OperationsContainer = () => {
     const OperationRequestReportPage = lazy(() => import("./OperationsRequestReport"))
     const OperationPendingRequestPage = lazy(() => import("./OperationsPendingRequest"))
    
  return (
    <div className="mt-20">
       <Suspense fallback={<div>
        <img src={Landing} alt="" />
      </div>}>
        <Routes>
            <Route path="" element={<div><img src={Landing} alt="" /></div>} />
            <Route path="/pending-request" element={<OperationPendingRequestPage/>} />
            <Route path="/request-report" element={<OperationRequestReportPage />} />
            {/* <Route path="/sorting-matching" element={<InBranchSortingMergingPage />} /> */}
            {/* quest" element={<CustomerActionRequestPage />} /> */}
        </Routes>
      </Suspense>
    </div>
  )
}

export default OperationsContainer
