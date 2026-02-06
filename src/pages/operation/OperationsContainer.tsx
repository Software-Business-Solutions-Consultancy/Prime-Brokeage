import { lazy, Suspense } from 'react'
import { Routes, Route } from "react-router"
import Landing from '/assets/img/others-landing.png'

const OperationsContainer = () => {
     const OperationRequestReportPage = lazy(() => import("./OperationsRequestReport"))
     const OperationPendingRequestPage = lazy(() => import("./OperationsPendingRequest"))
     const OperationPendingRequestApprovalPage = lazy(() => import("./OperationsPendingRequestApprover"))
     const OperationViewRequest = lazy(() => import('./ApproveRequest'))
     const UploadSecurityItemPage = lazy(() => import("./UploadSecurityItem"))
    
  return (
    <div className="my-20">
       <Suspense fallback={<div>
        <img src={Landing} alt="" />
      </div>}>
        <Routes>
            <Route path="" element={<div><img src={Landing} alt="" /></div>} />
            <Route path="/pending-request" element={<OperationPendingRequestPage/>} />
            <Route path="/pending-request/approver" element={<OperationPendingRequestApprovalPage/>} />
            <Route path="/pending-request/view/:id" element={<OperationViewRequest/>} />
            <Route path="/request-report" element={<OperationRequestReportPage />} />
            <Route path="/upload-security-item" element={<UploadSecurityItemPage />} />
            {/* <Route path="/sorting-matching" element={<InBranchSortingMergingPage />} /> */}
            {/* quest" element={<CustomerActionRequestPage />} /> */}
        </Routes>
      </Suspense>
    </div>
  )
}

export default OperationsContainer
