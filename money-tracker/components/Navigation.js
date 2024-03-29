"use client";

import { useContext } from 'react'
import { authContext } from '@/lib/store/auth-context'
import {ImStatsBars} from 'react-icons/im'
import { Link } from 'react-scroll';

function Nav(){
    const {user, loading, logout} = useContext(authContext);
    return (
        <header className='container max-w-2xl my-3 px-6 mx-auto'>
          <div className='flex items-center justify-between'>
            {/* User Info */}
            {user && !loading && (
              <div className='flex items-center gap-4'>
                {/* img */}
                <div className='h-[40px] w-[40px] rounded-full overflow-hidden'>
                  <img
                    className='object-cover w-full h-full'
                    src={user.photoURL}
                    alt={user.displayName}
                    referrerPolicy='no-referrer'
                  />
                </div>
      
                {/* name */}
                <small>Hi, {user.displayName}!</small>
              </div>
            )}
    
            {/* Right side fo nav */}
            {user && !loading && (
              <nav className='flex items-center gap-2'>
                <Link to="Chart" spy={true} smooth={true}>
                  <button>
                    <ImStatsBars className='text-2xl text-white'/>
                  </button>
                </Link>
                <div>
                  <button onClick={logout} className='btn btn-danger'>Sign out</button>
                </div>
              </nav>        
            )}
          </div>
        </header>    
      ) 
}

export default Nav