import { useEffect, useState } from 'react'

function Calendar() {
  const [today, setToday] = useState([])

  const getTodaysDate = () => {
    let currentDate = new Date().toJSON().slice(0, 10)
    return currentDate
  }

  useEffect(() => {
    const getToday = async () => {
      const url = `https://api.tvmaze.com/schedule/web?date=${getTodaysDate()}`
      const response = await fetch(url)
      const result = await response.json()
      const fileredForEnglish = result.filter(
        (show) => show._embedded.show.language === 'English'
      )
      setToday(fileredForEnglish)
    }

    getToday()
  }, [])

  return (
    <div className='container'>
      <div className='display-5 mt-3'>
        Streaming today ({getTodaysDate().replaceAll('-', '.')})
      </div>
      <table className='table table-dark table-striped my-3'>
        <thead>
          <tr className='d-md-table-row d-none'>
            <th scope='col'>Show</th>
            <th scope='col'>Show Name</th>
            <th scope='col'>New Episode</th>
            <th scope='col'>Web Channel</th>
            <th scope='col'>Link to</th>
          </tr>
        </thead>
        <tbody className=''>
          {today.map((newEp) => {
            return (
              <tr className='align-middle'>
                <td className='d-md-table-cell d-none'>
                  <img
                    src={newEp._embedded.show.image.medium}
                    style={{ width: '7rem' }}
                    alt=''
                    className=''
                  />
                </td>
                <td>{newEp._embedded.show.name}</td>
                <td>{newEp.name}</td>
                <td className='d-md-table-cell d-none'>
                  {newEp._embedded.show.webChannel.name}
                </td>
                <td>
                  <a
                    className='btn btn-outline-info'
                    href={newEp._embedded.show.officialSite}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Official Site
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default Calendar
