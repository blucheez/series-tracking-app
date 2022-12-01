import missing from '../assets/missing.jpg'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'

function SeriesCard(props) {
  const {
    id,
    name,
    premiered,
    image,
    genres,
    rating,
    externals,
    ended,
    summary,
  } = props.data

  const imdbURL = `https://www.imdb.com/title/${externals.imdb}`

  const location = useLocation()
  const auth = getAuth()
  const handleAddToAcc = async () => {
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid)
      const docSnap = await getDoc(userRef)

      if (docSnap.exists()) {
        const currentData = docSnap.data()

        await setDoc(userRef, {
          ...currentData,
          watching: arrayUnion(...currentData.watching, id),
        })
        toast.success('Show added to watchlist')
      } else {
        // doc.data() will be undefined in this case
        toast.error('Could not add to watchlist')
      }
    } catch (error) {
      toast.error(error.code)
    }
  }
  const handleRemoveFromAcc = async () => {
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid)

      await updateDoc(userRef, {
        watching: arrayRemove(id),
      })
      toast.success('Show removed from watchlist')
    } catch (error) {
      toast.error('Could not remove from watchlist')
    }
  }

  const formatSumm = (text) => {
    const textArr = text.split(' ')
    const newArr = textArr.map((word) => word.replace(/(<([^>]+)>)/gi, ''))
    return newArr.join(' ')
  }

  return (
    <div className='m-3'>
      <div
        className='card'
        style={{ width: '12rem', backgroundColor: '#222529' }}
      >
        <img
          src={image && image.medium !== null ? image.medium : missing}
          className='card-img-top'
          alt={name}
        />
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <p className='card-title'>
            {premiered ? premiered.slice(0, 4) : '-'}
          </p>
          <p className='card-text'>
            <small className='text-muted'>{genres && genres.join(', ')}</small>
          </p>
        </div>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item bg-transparent text-white'>
            {rating && rating.average !== null ? (
              <>
                <div>Average rating: {rating.average}</div>
                <div className='progress mt-1' style={{ height: '5px' }}>
                  <div
                    className='progress-bar bg-info'
                    role='progressbar'
                    aria-label='Rating bar'
                    style={{ width: `${rating.average * 10}%` }}
                    aria-valuenow={rating.average * 10}
                    aria-valuemin='0'
                    aria-valuemax='100'
                  ></div>
                </div>
              </>
            ) : (
              'No rating'
            )}
          </li>
          <li className='list-group-item bg-transparent text-white'>
            IMDb:{' '}
            {externals.imdb ? (
              <a
                href={imdbURL}
                target='_blank'
                rel='noreferrer'
                className='btn btn-outline-warning btn-sm ms-1'
              >
                link
              </a>
            ) : (
              <span className='btn btn-outline-light btn-sm ms-1' disabled>
                not available
              </span>
            )}
          </li>
          <li className='list-group-item bg-transparent text-white text-center'>
            <button
              className='btn btn-outline-info'
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
                      {summary ? formatSumm(summary) : 'No available summary'}
                    </div>
                    <div className='mt-3'>
                      Status:{' '}
                      {ended
                        ? `ended on ${ended.replaceAll('-', '.')}`
                        : 'running'}
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
                    {location.pathname !== '/profile' && (
                      <button
                        className='btn btn-success'
                        onClick={handleAddToAcc}
                      >
                        Add to watchlist
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div className='card-body text-center'>
          {location.pathname !== '/profile' ? (
            <button className='btn btn-success' onClick={handleAddToAcc}>
              Add to watchlist
            </button>
          ) : (
            <button className='btn btn-danger' onClick={handleRemoveFromAcc}>
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SeriesCard
