import React from 'react'
import { useLocation, useNavigate, useResolvedPath } from 'react-router';
import type { IconProps } from '../icons/types';

interface LayoutOptionTileProps {
  name: string;
  path: string;
  icon?: React.ReactElement;
}
const LayoutOptionTile = ({
     name,
  path,
  icon,
}: LayoutOptionTileProps) => {
    console.log(name)
   const location = useLocation();
  const resolved = useResolvedPath(path);
  const navigate = useNavigate();
  // console.log(hasPermission)
  const match = location.pathname === path ? true : false;
console.log(match, path)
  const fp = resolved.pathname.split('/')[1];
  console.log(fp)
//   const fullPath = `/${fp}/${path}`;

  const activeIcon = React.isValidElement(icon)
    ? React.cloneElement(icon, { isActive: !!match } as IconProps)
    : icon;
    console.log(activeIcon, 'dsd')



    
    const gotoPath = (path: string, name: string) => {
        // const fullPath = basepath ? `${basepath}${path}` : path;    
        // console.log('Navigating to:', fullPath);
        // window.location.href = path;
        if (name === 'Logout') {
            // Perform logout logic here
            console.log('Logging out...');
            // For example, clear user session, redirect to login page, etc.
            navigate('/');
            return;
        }
        navigate(path);
    }


  return (
    <div onClick={() => gotoPath(path, name)}  className={`border cursor-pointer border-gray-300 rounded-lg p-4 ${location.pathname === path ? 'bg-[#BA68C8] font-medium' : 'border-[#BA68C8]'}`}>
                <>{activeIcon}</>
                <p className={`pt-3 break break-words ${location.pathname === path ? 'text-white' : 'text-[#2A2A2A]'}`}>{name}</p>
            </div>
  )
}

export default LayoutOptionTile
