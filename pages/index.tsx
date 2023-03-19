import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Loader from '@/components/Loader'
import Row from '@/components/Row'
import useAuth from '@/hooks/useAuth'
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

  const { logout, loading } = useAuth()

  if (loading) {
    return <Loader />
  }
  return (
    <div className='relative h-screen bg-gradient-to-bt  lg:h-[140vh]'>
      <Head>
        <title>Home - Marflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        {/* Banner */}
        <Banner netflixOriginals={netflixOriginals} />
        <section className='relative md:space-y-24'>
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Action Thrillers" movies={actionMovies} />

          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Documentaries" movies={documentaries} />
          <Row />
        </section>

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