import RequestIcon from '../icons/RequestIcon'
import ReportIcon from '../icons/ReportIcon'
import NewRequestIcon from '../icons/NewRequestIcon';
import LayoutOptionTile from './LayoutOptionTile';
import LogOutIcon from '../icons/LogOutIcon';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { ArrowDownWideNarrow, FileText } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
// import RequestReportIcon from '../icons/RequestReportIcon';


const LayoutOptions = () => {
  const location = useLocation();
  const {userType} = useUserStore()
const [selectedUser, setselectedUser] = useState('customer');
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
        name: 'New Request',
        path: '/customer/new-request',
        icon: <NewRequestIcon/>
      },
      {
        name: 'Report',
        path: '/customer/report',
        icon: <ReportIcon/>
      },
      {
        name: 'Logout',
        path: '/logout',
        icon: <LogOutIcon/>
      },
    ]
  },
  // {
  //   owner: 'gmi',
  //   options: [
  //     {
  //       name: 'Request Review',
  //       path: '/in-branch/request-review',
  //     },
  //     {
  //       name: 'Request Report',
  //       path: '/in-branch/request-report',
  //     },
  //     {
  //       name: 'Sorting/Matching',
  //       path: '/in-branch/sorting-matching',
  //               icon: <ArrowDownWideNarrow/>

  //     },
  //     {
  //       name: 'Sorted/Matched',
  //       path: '/sorted-matched',
  //               icon: <RequestIcon/>

  //     },
  //     {
  //       name: 'Report',
  //       path: '/report',
  //               icon: <ReportIcon/>

  //     },
  //     {
  //       name: 'Logout',
  //       path: '/logout',
  //       icon: <LogOutIcon/>

  //     }
  //   ]
  // },
  {
    owner: 'gmi',
    options: [
      {
        name: 'Request Review',
        path: '/gmt/request-review',
      },
      {
        name: 'Sorting/Matching',
        path: '/gmt/sorting-matching',
                icon: <ArrowDownWideNarrow/>

      },
      
      // {
      //   name: 'Authorize for Payment',
      //   path: '/gmt/authorize-for-payment',
      //           icon: <RequestIcon/>

      // },
      {
        name: 'Sorted/Matched',
        path: '/gmt/sorted-matched',
                icon: <RequestIcon/>

      },
      // {
      //   name: 'Report',
      //   path: '/gmt/request-report',
      //           icon: <RequestIcon/>

      // },

      
      {
        name: 'Report',
        path: '/gmt/report',
                icon: <ReportIcon/>

      },

      {
        name: 'Logout',
        path: '/logout',
        icon: <LogOutIcon/>

      }
    ]
  },
  {
    owner: 'gmta',
    options: [
      {
        name: 'Request Review',
        path: '/gmt/request-review',
      },
      {
        name: 'Sorting/Matching',
        path: '/gmt/sorting-matching',
                icon: <ArrowDownWideNarrow/>

      },
      
      {
        name: 'Authorize for Payment',
        path: '/gmt/authorize-for-payment',
                icon: <RequestIcon/>

      },
      {
        name: 'Request Report',
        path: '/gmt/request-report',
                icon: <RequestIcon/>

      },

      
      // {
      //   name: 'Report',
      //   path: '/gmt/report',
      //           icon: <ReportIcon/>

      // },

      {
        name: 'Sorted/Matched',
        path: '/gmt/sorted-matched',
                icon: <RequestIcon/>

      },
      {
        name: 'Logout',
        path: '/logout',
        icon: <LogOutIcon/>

      }
    ]
  },
  {
    owner: 'ops',
    options: [
      {
        name: 'Pending Request',
        path: '/operations/pending-request',
        icon: <RequestIcon/>
      },
      {
        name: 'Request Report',
        path: '/operations/request-report',
        icon: <FileText className={location.pathname === '/operations/request-report' ? 'fill-white' : ''}/>
      },
      {
        name: 'Upload Security Item',
        path: '/operations/upload-security-item',
        icon: <FileText className={location.pathname === '/operations/upload-security-item' ? 'fill-white' : ''}/>
      },
      
      {
        name: 'Logout',
        path: '/logout',
        icon: <LogOutIcon/>

      }
    ]
  },
  {
    owner: 'opsa',
    options: [
      {
        name: 'Pending Request',
        path: '/operations/pending-request/approver',
        icon: <RequestIcon/>
      },
      {
        name: 'Request Report',
        path: '/operations/request-report',
        icon: <FileText className={location.pathname === '/operations/request-report' ? 'fill-white' : ''}/>
      },
      // {
      //   name: 'Upload Security Item',
      //   path: '/operations/upload-security-item',
      //   icon: <FileText className={location.pathname === '/operations/upload-security-item' ? 'fill-white' : ''}/>
      // },
      
      {
        name: 'Logout',
        path: '/logout',
        icon: <LogOutIcon/>

      }
    ]
  }
]

useEffect(() => {
    if (location.pathname.includes('customer')) {
      setselectedUser('customer');
    } else if (location.pathname.includes('in-branch')) {
      setselectedUser('inBranch');
    } else if (location.pathname.includes('gmt')) {
      setselectedUser('gmt');
    } else if (location.pathname.includes('operations')) {
      setselectedUser('operations');
    }

}, [location.pathname]);


    
  return (
    <div className='px-[70px] py-6 '>
      <div className='mt-20'> 

      {
        location.pathname.includes('customer') &&

                  <p  className='text-[27px] font-bold mb-[30px]'>Unlock Your Trading Potential  to maximize your investment strategies</p>
      }
      </div>
        
      <div className='grid md:grid-cols-2 grid-cols-1 gap-7'>
        {
          menus.find(menu => menu.owner === userType)?.options.map((menu, index) => (
            <LayoutOptionTile key={index+'dd'} {...menu} />
          ))
        }
      </div>
    </div>
  )
}

export default LayoutOptions
