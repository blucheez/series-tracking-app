import { useState, useEffect } from 'react'
import SeriesCard from '../components/SeriesCard'

function Series() {
  const [searchText, setSearchText] = useState('')
  const [seriesData, setSeriesData] = useState('')

  const handleOnChange = (e) => {
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
          <label htmlFor='search' className='form-label'>
            Search
          </label>
          <input
            className='form-control'
            type='text'
            name='search'
            id='search'
            onChange={handleOnChange}
          />
          {/* <button className='btn btn-outline-warning' type='submit'>
            Go!
          </button> */}
        </form>
      </div>
      <div className='d-flex flex-wrap'>
        {seriesData &&
          seriesData.map((tvShow, i) => {
            return <SeriesCard key={i} data={tvShow.show} />
          })}
      </div>
    </div>
  )
}
export default Series
