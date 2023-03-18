import { baseUrlThumbnail } from "@/constant/movies"
import { IMovie } from "@/interface"
import Image from "next/image"

interface Props {
  movie?: IMovie
}

const Thumbnail = ({ movie }: Props) => {
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-in-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <Image src={`${baseUrlThumbnail}${movie?.backdrop_path || movie?.poster_path}`} loading="lazy" fill alt="" className="object-cover rounded-sm md:rounded " />
    </div>
  )
}

export default Thumbnail