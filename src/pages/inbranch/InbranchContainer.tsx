import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router"
import Landing from '/assets/img/customer-landing.png'



const InbranchContainer = () => {
 const RequestViewPage = lazy(() => import("./RequestReview"))
 const InBranchRequestReportPage = lazy(() => import("./InbranchRequestReport"))
 const InBranchSortingMergingPage = lazy(() => import("./InbranchSortingMerging"))
    // const CustomerReportPage = lazy(() => import("./CustomerReport"))
    // const CustomerNewRequestPage = lazy(() => import("./NewRequest"))
    // const CustomerActionRequestPage = lazy(() => import("./ActionRequest"))
  return (
     <Suspense fallback={<div>
        <img src={Landing} alt="" />
      </div>}>
        <Routes>
            <Route path="" element={<div><img src={Landing} alt="" /></div>} />
            <Route path="/request-review" element={<RequestViewPage />} />
            <Route path="/request-report" element={<InBranchRequestReportPage />} />
            <Route path="/sorting-matching" element={<InBranchSortingMergingPage />} />
            {/* <Route path="/report" element={<CustomerReportPage />} />
            <Route path="/new-request" element={<CustomerNewRequestPage />} />
            <Route path="/action-request" element={<CustomerActionRequestPage />} /> */}
        </Routes>
      </Suspense>
  )
}

export default InbranchContainer

