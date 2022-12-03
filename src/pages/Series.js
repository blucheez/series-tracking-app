import { useState, useEffect } from 'react'
import SeriesCard from '../components/SeriesCard'

function Series() {
  const [searchText, setSearchText] = useState('')
  const [seriesData, setSeriesData] = useState('')

  const handleOnChange = (e) => {
    e.preventDefault()
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const queryURL = `https://api.tvmaze.com/search/shows?q=${searchText}`

    const fetchSeries = async () => {
      if (searchText) {
        const response = await fetch(queryURL)
        const result = await response.json()
        setSeriesData(result)
      }
    }

    fetchSeries()
    // eslint-disable-next-line
  }, [searchText])

  return (
    <div className='container'>
      <div className='my-5 col col-5'>
        <form>
          <label htmlFor='search' className='form-label display-6'>
            Search for TV series
          </label>
          <input
            className='form-control'
            type='text'
            name='search'
            id='search'
            onChange={handleOnChange}
            placeholder='Start typing...'
          />
        </form>
      </div>
      <div className='d-flex flex-wrap justify-content-sm-center'>
        {seriesData ? (
          seriesData.map((tvShow, i) => {
            return <SeriesCard key={i} data={tvShow.show} />
          })
        ) : (
          <div className='text-warning'>No results</div>
        )}
      </div>
    </div>
  )
}
export default Series
