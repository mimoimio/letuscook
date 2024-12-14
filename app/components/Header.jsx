import Image from 'next/image';
import Link from 'next/link'

function Navbar() {
  return (
    <div className="px-4 sm:px-10">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Image
          className="ml-0 sm:ml-10"
          src="/LetUsCook.png"
          alt="Let Us Cook Logo"
          width={160}
          height={160}
        />

        {/* Dropdown for mobile */}
        <div className="relative sm:hidden group">
          <button className="text-xl font-bold mr-7">...</button>
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg hidden group-hover:block">
            <div className="flex flex-col items-start p-2">
             
                <a className="py-1 px-4 hover:bg-gray-200 w-full text-left">
                  Home
                </a>
              
             
                <a className="py-1 px-4 hover:bg-gray-200 w-full text-left">
                  Explore
                </a>
             
              
                <a className="py-1 px-4 hover:bg-gray-200 w-full text-left">
                  Favourites
                </a>
             
                <a className="py-1 px-4 hover:bg-gray-200 w-full text-left">
                  I'm Feeling Zesty
                </a>
             
            </div>
          </div>
        </div>

        {/* Navigation for larger screens */}
        <div>
        <ul  className="hidden sm:flex sm:space-x-10 items-center font-bold text-base sm:text-xl">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/explore">Explore</Link>
      </li>
      <li>
        <Link href="/favourite">Favourite</Link>
      </li>
      <li>
        <Link href="/random">Im Feeling Zesty</Link>
      </li>
    </ul>
    </div>
  
      </div>
    </div>
  );
}

export default Navbar;
