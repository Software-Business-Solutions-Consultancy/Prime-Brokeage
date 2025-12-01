import React from 'react'
import LayoutOptions from './LayoutOptions';

interface DefaultLayoutProps {
  LayoutContainer: React.ComponentType;
}
const DefaultLayout: React.FC<DefaultLayoutProps> = ({LayoutContainer}) => {

     
    
  return (
    <div className='flex w-full h-screen'>
      <div className='flex-shrink-0 min-h-0 w-[30%] bg-gradient-to-br from-white via-white to-[rgba(110,10,163,0.08)]'>
            <LayoutOptions/>
      </div>
    <div className='w-[70%] overflow-y-auto px-[33px]'>
        <LayoutContainer/>
    </div>

    </div>
  )
}

export default DefaultLayout
