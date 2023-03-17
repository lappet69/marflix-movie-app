import Banner from '@/components/Banner'
import Header from '@/components/Header'
import { IMovie } from '@/interface'
import requests from '@/utils/requests'
import { Barlow_Condensed, Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })
const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: '400'
})

interface Props {
  netflixOriginals: IMovie[]
  trendingNow: IMovie[]
  topRated: IMovie[]
  actionMovies: IMovie[]
  comedyMovies: IMovie[]
  horrorMovies: IMovie[]
  romanceMovies: IMovie[]
  documentaries: IMovie[]
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries, }: Props) => {
  return (
    <div className='relative h-screen bg-gradient-to-b from-gray-900/10 to-[#fff] lg:h-[140vh]'>
      <Head>
        <title>Home - Marflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      <main>
        {/* Banner */}
        <Banner netflixOriginals={netflixOriginals} />
        <section>
          {/* Row */}
          {/* Row */}
          {/* Row */}
        </section>


        <h2 className={`${inter.className} bg-red-100`}>helo tailwind</h2>
      </main>
    </div>
  )
}
export default Home


export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),

  ])
  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    }
  }
}