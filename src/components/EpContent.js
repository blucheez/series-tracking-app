import { useState } from 'react'
import missing from '../assets/missing.jpg'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import {
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

function EpContent(props) {
  const auth = getAuth()
  const { season, image, name, id, number, summary } = props.data
  const currentSeason = props.currentSeason
  const [watched, setWatched] = useState(false)

  const formatSumm = (text) => {
    const textArr = text.split(' ')
    const newArr = textArr.map((word) => word.replace(/(<([^>]+)>)/gi, ''))
    return newArr.join(' ')
  }

  const handleWatched = async () => {
    /* setWatched((prev) => !prev) */

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid)
      if (watched) {
        await updateDoc(userRef, {
          watchedEpisodes: arrayRemove(id),
        })
        setWatched(false)
        toast.info(`You unwatched ${episodeText}`)
      } else {
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
          const currentData = docSnap.data()
          if (currentData.watchedEpisodes) {
            await updateDoc(userRef, {
              watchedEpisodes: arrayUnion(id),
            })

            toast.success(`You watched ${episodeText}`)
          }
        }
      }
    } catch (error) {
      toast.error('There was a database error')
      console.log(error)
    }
  }

  const episodeText = `S${season}E${number}`

  useEffect(() => {
    const getWatchedEpisode = async () => {
      const userRef = doc(db, 'users', auth.currentUser.uid)
      onSnapshot(userRef, (doc) => {
        const userDoc = doc.data()
        if (userDoc.watchedEpisodes.includes(id)) {
          setWatched(true)
        }
      })
    }
    getWatchedEpisode()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {season === currentSeason && (
        <div className='col d-flex align-items-stretch' key={id}>
          <div
            className='card bg-dark border-secondary mb-2'
            /* style={{ maxWidth: '12rem', backgroundColor: '#222529' }} */
          >
            <img
              src={image && image.medium !== null ? image.medium : missing}
              className={`card-img-top ${watched && 'darkened-card'}`}
              alt='...'
            />

            <div className={`card-body ${watched && 'darkened-card'}`}>
              <p className='card-title fs-5'>{name}</p>
              <p className='card-text'>{episodeText}</p>
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
                        {summary ? formatSumm(summary) : 'No available summary'}
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
                  onChange={handleWatched}
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
