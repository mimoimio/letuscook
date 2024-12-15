import Image from 'next/image';
import Link from 'next/link'

const Pill = ({href,name}) => {
  return(
  <li>
    <Link href={href} className='px-4 p-2 hover:bg-gray-300 rounded-full hover:shadow-lg duration-100'>{name}</Link>
  </li>);
}

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

        {/* Navigation for larger screens */}
        <div>
          <ul className="hidden sm:flex sm:space-x-10 items-center font-bold text-base sm:text-xl">
            
            <Pill href={"/"} name={"Home"}/>
            <Pill href={"/explore"} name={"Explore"}/>
            <Pill href={"/favourite"} name={"Favourite"}/>
            <Pill href={"/random"} name={"Surprise Me"}/>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Navbar;