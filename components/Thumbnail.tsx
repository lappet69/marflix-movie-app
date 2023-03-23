import { modalState, movieState } from "@/atoms/modalAtom"
import { baseUrlThumbnail } from "@/constant/movies"
import { IMovie } from "@/interface"
import { DocumentData } from "firebase/firestore"
import Image from "next/image"
import { useRecoilState } from "recoil"

interface Props {
  movie: IMovie | DocumentData
}

const Thumbnail = ({ movie }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-in-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
      <Image
        src={`${baseUrlThumbnail}${movie?.backdrop_path || movie?.poster_path}`}
        loading="lazy"
        decoding="async"
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        fill
        alt=""
        className="object-cover rounded-sm md:rounded " />
    </div>
  )
}

export default Thumbnail