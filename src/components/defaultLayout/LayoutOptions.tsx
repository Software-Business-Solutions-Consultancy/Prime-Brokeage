import React from 'react'
import RequestIcon from '../icons/RequestIcon'
import ReportIcon from '../icons/ReportIcon'
import { useLocation, useNavigate } from 'react-router';
import { fetchBasePath } from '../../core/utils/fetchBasePath';



const LayoutOptions = () => {
    const navigate = useNavigate()
    const location = useLocation();
        const menus = [
  {
    owner: 'customer',
    options: [
      {
        name: 'Pending Request',
        path: '/customer/pending-request',
        icon: <RequestIcon/>
      },
      {
        name: 'Report',
        path: '/customer/report',
        icon: <ReportIcon/>
      },
      {
        name: 'Logout',
        path: '/logout',
      },
    ]
  },
  {
    owner: 'inBranch',
    options: [
      {
        name: 'Request Review',
        path: '/request-review',
      },
      {
        name: 'Request Report',
        path: '/request-report',
      },
      {
        name: 'Sorting/Matching',
        path: '/sorting-matching',
      },
      {
        name: 'Sorted/Matched',
        path: '/sorted-matched',
      },
      {
        name: 'Report',
        path: '/report',
      },
      {
        name: 'Logout',
        path: '/logout',
      }
    ]
  }
]


const gotoPath = (path: string) => {
    // const fullPath = basepath ? `${basepath}${path}` : path;    
    // console.log('Navigating to:', fullPath);
    // window.location.href = path;
    navigate(path);
}
       
  return (
    <div className='px-[70px] py-6 '>
                  <p className='text-[27px] font-bold mb-[30px]'>Unlock Your Trading Potential  to maximize your investment strategies</p>
        
      <div className='grid md:grid-cols-2 grid-cols-1 gap-7'>
        {menus[0]?.options.map((menu, index) => (       
            <div onClick={() => gotoPath(menu.path)} key={index} className={`border cursor-pointer border-gray-300 rounded-lg p-4 ${location.pathname === menu.path ? 'bg-[#BA68C8] font-medium' : 'border-[#BA68C8]'}`}>
                <>{menu?.icon}</>
                <p className={`pt-3 ${location.pathname === menu.path ? 'text-white' : 'text-[#2A2A2A]'}`}>{menu?.name}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default LayoutOptions
