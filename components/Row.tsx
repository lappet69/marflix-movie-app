import { IMovie } from "@/interface";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from 'react';
import Thumbnail from "./Thumbnail";

interface Props {
  title?: string;
  movies?: IMovie[]
}

const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (str: string) => {
    console.log(str)
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      const scrollTo = str === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  // console.log(rowRef.current!.scrollLeft, rowRef.current!.clientWidth)
  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">{title}</h2>
      <div className="group relative md:ml-2">
        <ChevronLeftIcon className={`absolute top-0 left-2 bottom-0 z-40 m-auto w-9 h-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && 'hidden'}`}
          onClick={() => handleClick("left")}
        />
        {/* Thumbnail */}
        <div className="flex scrollbar-hide  items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2">
          {movies?.map((movie, idx) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon className={`absolute top-0 right-2 bottom-0 z-40 m-auto w-9 h-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 `}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  )
}

export default Row