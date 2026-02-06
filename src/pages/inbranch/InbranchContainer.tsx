import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router"
import Landing from '/assets/img/others-landing.png'



const InbranchContainer = () => {
 const RequestViewPage = lazy(() => import("./RequestReview"))
 const InBranchRequestReportPage = lazy(() => import("./InbranchRequestReport"))
 const InBranchSortingMergingPage = lazy(() => import("./InbranchSortingMerging"))
 const InBranchSortedMergedPage = lazy(() => import("./InbranchSortedMerged"))
 const GmtReport = lazy(() => import("./GmtReport"))
 const GmtAuthorizeForPayment = lazy(() => import("./GmtAuthorizeForPayment"))
 // const CustomerReportPage = lazy(() => import("./CustomerReport"))
    // const CustomerNewRequestPage = lazy(() => import("./NewRequest"))
    // const CustomerActionRequestPage = lazy(() => import("./ActionRequest"))
  return (
    <div className="my-20">

     <Suspense fallback={<div>
        <img src={Landing} alt="" />
      </div>}>
        <Routes>
            <Route path="" element={<div><img src={Landing} alt="" /></div>} />
            <Route path="/request-review" element={<RequestViewPage />} />
            <Route path="/request-report" element={<InBranchRequestReportPage />} />
            <Route path="/sorting-matching" element={<InBranchSortingMergingPage />} />
            <Route path="/sorted-merged" element={<InBranchSortedMergedPage />} />
            <Route path="/report" element={<GmtReport />} />
            <Route path="/authorize-for-payment" element={<GmtAuthorizeForPayment />} />
            {/* <Route path="/new-request" element={<CustomerNewRequestPage />} />
            <Route path="/action-request" element={<CustomerActionRequestPage />} /> */}
        </Routes>
      </Suspense>
    </div>
  )
}

export default InbranchContainer

