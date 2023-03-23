import { modalState, movieState } from "@/atoms/modalAtom"
import { baseUrl } from "@/constant/movies"
import { IMovie } from "@/interface"
import { InformationCircleIcon } from "@heroicons/react/20/solid"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaPlay } from "react-icons/fa"
import { useRecoilState } from "recoil"

interface Props {
  netflixOriginals: IMovie[]
}
const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<IMovie | null>(null)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
  }, [netflixOriginals])

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 md:space-x-3 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 h-[96vh] w-screen -z-10">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          loading="lazy"
          decoding="async"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
          className="object-cover " />
      </div>
      <h1 className="text-2xl md:-ml-1 font-bold md:text-4xl lg:text-7xl">{movie?.title || movie?.name || movie?.original_title}</h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl text-shadow-md">{movie?.overview}</p>

      <div className="flex space-x-3">
        <button className="bannerBtn bg-white text-black"><FaPlay className="h-4 w-4 md:" />Play</button>
        <button
          className="bannerBtn bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true)
          }}
        >
          More Info
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /></button>
      </div>
    </div>
  )
}

export default Banner