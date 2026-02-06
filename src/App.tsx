import './App.css'
import Footer from './components/shared/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './Routes';
import Header from './components/shared/Header';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
        <Header />
        <div className=''>
          <Router />
        </div>
       <Footer />
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </QueryClientProvider>
  )
}

export default App
