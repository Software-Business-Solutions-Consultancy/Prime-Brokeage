import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router"
import Landing from '/assets/img/customer-landing.png'

const CustomerContainer = () => {
    const RequestPage = lazy(() => import("./AllRequest"))
  return (
    <div className="mt-20">
      <Suspense fallback={<div>
        <img src={Landing} alt="" />
      </div>}>
        <Routes>
            <Route path="" element={<div><img src={Landing} alt="" /></div>} />
            <Route path="/pending-request" element={<RequestPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default CustomerContainer
