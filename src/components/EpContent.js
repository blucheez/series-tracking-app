import { useState } from 'react'

function EpContent(props) {

  const { season, image, name, id, number, summary } = props.data
  const currentSeason = props.currentSeason
  const [watched, setWatched] = useState(false)

  const formatSumm = (text) => {
    const textArr = text.split(' ')
    const newArr = textArr.map((word) => word.replace(/(<([^>]+)>)/gi, ''))
    return newArr.join(' ')
  }
  
  return (
    <>
      {season === currentSeason && (
        <div className='col' style={{ height: '20rem' }} key={id}>
          <div className='card bg-dark'>
            <img src={image.medium} className='card-img-top' alt='...' />
            <div className='card-body'>
              <p className='card-title fs-5'>{name}</p>
              <p className='card-text'>{`S${season}E${number}`}</p>
            </div>
            <div className='card-footer d-flex justify-content-around flex-wrap'>
              <button
                className='btn btn-outline-info mb-2 mb-xxl-0'
                data-bs-toggle='modal'
                data-bs-target={`#Modal${id}`}
              >
                Details
              </button>
              <div
                className='modal fade text-white'
                id={`Modal${id}`}
                tabIndex='-1'
                aria-labelledby='ModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog'>
                  <div className='modal-content bg-dark text-white'>
                    <div className='modal-header'>
                      <h1 className='modal-title fs-5' id='ModalLabel'>
                        {name}
                      </h1>
                      <button
                        className='btn-close btn-close-white'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                      ></button>
                    </div>
                    <div className='modal-body text-start'>
                      <div>
                        {summary
                          ? formatSumm(summary)
                          : 'No available summary'}
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='ms-1'>
                <input
                  type='checkbox'
                  className='btn-check'
                  id={`btn-check-outlined-${id}`}
                  autoComplete='off'
                  checked={watched}
                  onChange={() => setWatched((prev) => !prev)}
                />
                <label
                  className='btn btn-outline-warning'
                  htmlFor={`btn-check-outlined-${id}`}
                >
                  Watched
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default EpContent
