import { useEffect, useState } from 'react'
import EpContent from './EpContent'

function EpisodeCard(props) {
  const { _embedded } = props.data

  const [episodes, setEpisodes] = useState([])
  const [currentSeason, setCurrentSeason] = useState(1)

  const handleCurrentSeason = (e) => {
    setCurrentSeason(Number(e.target.value))

    setEpisodes((prev) => prev.filter((ep) => ep.season === currentSeason))
  }

  useEffect(() => {
    setEpisodes(props.data._embedded.episodes)
  }, [props.data._embedded.episodes, episodes])

  return (
    <>
      <div className='fs-5'>Seasons:</div>
      <div className='d-flex flex-wrap mt-2'>
        {_embedded.seasons.map((season, i) => {
          return (
            <button
              key={i}
              className='btn btn-outline-info btn-sm me-2'
              value={i + 1}
              onClick={handleCurrentSeason}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
      <div className='mt-3 pe-3'>
        <div className='row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-1'>
          {episodes.map((ep, i) => {
            return <EpContent key={i} data={ep} currentSeason={currentSeason} />
          })}
        </div>
      </div>
    </>
  )
}
export default EpisodeCard
