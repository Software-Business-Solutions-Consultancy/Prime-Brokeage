import RequestIcon from '../icons/RequestIcon'
import ReportIcon from '../icons/ReportIcon'
import NewRequestIcon from '../icons/NewRequestIcon';
import LayoutOptionTile from './LayoutOptionTile';
import LogOutIcon from '../icons/LogOutIcon';
import { useLocation } from 'react-router';



const LayoutOptions = () => {
  const location = useLocation();

        const menus = [
  {
    owner: 'customerInitiator',
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
  {
    owner: 'inBranch',
    options: [
      {
        name: 'Request Review',
        path: '/in-branch/request-review',
      },
      {
        name: 'Request Report',
        path: '/in-branch/request-report',
      },
      {
        name: 'Sorting/Matching',
        path: '/in-branch/sorting-matching',
                icon: <RequestIcon/>

      },
      {
        name: 'Sorted/Matched',
        path: '/sorted-matched',
                icon: <RequestIcon/>

      },
      {
        name: 'Report',
        path: '/report',
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
    owner: 'operations',
    options: [
      {
        name: 'Pending Request',
        path: '/operations/pending-request',
      },
      {
        name: 'Request Report',
        path: '/operations/request-report',
      },
      
      {
        name: 'Logout',
        path: '/logout',
        icon: <LogOutIcon/>

      }
    ]
  }
]


    
  return (
    <div className='px-[70px] py-6 '>
      <div className='mt-20'> 

      {
        location.pathname.includes('customer') &&

                  <p  className='text-[27px] font-bold mb-[30px]'>Unlock Your Trading Potential  to maximize your investment strategies</p>
      }
      </div>
        
      <div className='grid md:grid-cols-2 grid-cols-1 gap-7'>
        {menus[2]?.options.map((menu, index) => (       
            <LayoutOptionTile key={index} {...menu} />
        ))}
      </div>
    </div>
  )
}

export default LayoutOptions
