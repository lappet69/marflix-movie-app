import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";

import { Barlow_Condensed } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: "500"
})

const Header = () => {
  const navMenus = ["Home", "Tv Shows", "Movies", "New & Popular", "My List"]

  const [isScroll, setIsScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true)
      } else {
        setIsScroll(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className={`${isScroll && 'bg-[#1a1a1a]'} ${barlow.className} `}>
      <div className={` flex items-center space-x-2 md:space-x-10`}>
        <Image src="" width={100} height={50} alt="" className="cursor-pointer object-contain" />
        <ul className="hidden space-x-4 md:flex">
          {navMenus.map((menu, idx) => (
            <li key={idx} className="navLink">{menu}</li>
          ))}
        </ul>

      </div>

      <div className="flex items-center space-x-4 text-sm md:text-xl lg:text-2xl text-white">
        <AiOutlineSearch className="hidden sm:inline h-6 w-6" />
        <p className="hidden lg:inline">Kids</p>
        <AiOutlineBell className="w-6 h-6" />
        <Link href={"/account"}>
          <Image src="" width={24} height={24} alt="" className="cursor-pointer rounded" />
        </Link>
      </div>
    </header>
  )
}

export default Header