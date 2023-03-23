import { modalState, movieState } from '@/atoms/modalAtom'
import { HandThumbUpIcon, PlusIcon, SpeakerWaveIcon, SpeakerXMarkIcon, XMarkIcon } from '@heroicons/react/20/solid'
import MuiModal from '@mui/material/Modal'
import { Barlow_Semi_Condensed } from 'next/font/google'
import { useEffect, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'
import ReactPlayer from 'react-player/lazy'
import { useRecoilState } from 'recoil'
import { IElement, IGenre } from '../interface'
const barlow = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: '400'
})

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)

  const [trailer, setTrailer] = useState("")
  const [genres, setGenres] = useState<IGenre[]>()
  const [muted, setMuted] = useState(true)
  const [played, setPlayed] = useState(false)
  const handleClose = () => {
    setShowModal(false)
  }

  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {

      const data = await fetch(
        `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err.json()))

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: IElement) => element.type === 'Trailer'
        )
        setTrailer(data?.videos.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data?.genres)
      }
    }
    fetchMovie()
  }, [movie])


  return (
    <MuiModal open={showModal} onClose={handleClose}
      className={`fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded scrollbar-hide ${barlow.className}`}>
      <>
        <button
          onClick={handleClose}
          className='modalBtn absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:opacity-75 md:py-2.5 '
        >
          <XMarkIcon className='h-6 w-6' />
        </button>

        <div className='relative pt-[56.25%]'>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            playing={played}
            muted={muted}
          />
          <div className='absolute bottom-5 flex w-full items-center justify-between px-10'>
            <div className='flex space-x-2'>
              <button className='flex items-center gap-x-2 py-1 rounded bg-white text-xl px-4 font-bold text-black transition hover:bg-[#eaeaea]/70'
                onClick={() => setPlayed(!played)}
              >
                {played ?
                  <FaPause className='modalIcon text-black ' />
                  :
                  <FaPlay className='modalIcon text-black' />
                }
              </button>
              <button className='modalBtn'>
                <PlusIcon className='modalIcon' />
              </button>
              <button className='modalBtn'>
                <HandThumbUpIcon className='modalIcon' />
              </button>
            </div>
            <button className='modalBtn' onClick={() => setMuted(!muted)}>
              {muted ?
                <SpeakerXMarkIcon className="modalIcon" />
                :
                <SpeakerWaveIcon className="modalIcon" />
              }
            </button>
          </div>
        </div>

        <div className='flex space-x-16 rounded-b-md bg-[#333] px-10 py-8'>
          <div className='space-y-6 text-lg'>
            <div className='flex items-center space-x-2 text-sm'>
              <p className='text-green-400 font-semibold'>{movie!.vote_average * 10}% Match</p>
              <p className=''>{movie?.release_date || movie?.first_air_date}</p>
              <div className='flex h-4 items-center justify-center rounded border-white border px-1.5 text-xs'>
                HD
              </div>
            </div>
            <div className='flex flex-col w-full  gap-x-10 gap-y-3  md:flex-row relative'>
              <div>
                <p className='text-lg font-semibold'>{movie?.original_title}</p>
                <p className='w-5/6 text-md font-light'>{movie?.overview}</p>
              </div>
              <div className='flex flex-col md:w-2/3 space-y-3 text-sm md:ml-auto'>
                <div>
                  <span className='text-[gray]'>Genres: </span>
                  {genres?.map((genre) => genre.name).join(', ')}
                </div>
                <div>
                  <span className='text-[gray]'>Original language: </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className='text-[gray]'>Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )


}

export default Modal
