import {ImStatsBars} from 'react-icons/im'

function Nav(){
    return (
        <header className='container max-w-2xl px-6 py-6 mx-auto'>
          <div className='flex items-center justify-between'>
            {/* User Info */}
            <div className='flex items-center gap-2'>
              {/* img */}
              <div className='h-[40px] w-[40px] rounded-full overflow-hidden'>
                <img
                  className='object-cover w-full h-full'
                  src="/profile.jpg"
                  alt="Profile Img"
                />
              </div>
    
              {/* name */}
              <small>Hi, Leon!</small>
            </div>
    
            {/* Right side fo nav */}
            <nav className='flex items-center gap-2'>
              <div><ImStatsBars className='text-2xl text-white' /></div>
              <div><button className='btn btn-danger'>Sign out</button></div>
            </nav>        
          </div>
    
        </header>    
      ) 
}

export default Nav