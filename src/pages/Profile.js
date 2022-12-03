import { useEffect, useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import SeriesCard from '../components/SeriesCard'
import EpisodeCard from '../components/EpisodeCard'

function Profile() {
  const auth = getAuth()
  const [edit, setEdit] = useState(false)
  const [userData, setUserData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const [watchlistIDs, setWatchlistIDs] = useState([])
  const [watchlistDetailed, setWatchlistDetailed] = useState([])

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== userData.name) {
        await updateProfile(auth.currentUser, {
          displayName: userData.name,
        })

        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          username: userData.name,
        })
      }
    } catch (error) {
      toast.error(error.code)
    }
  }

  const handleOnChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // set currently watched show to state
  useEffect(() => {
    const getWatchlist = () => {
      const userRef = doc(db, 'users', auth.currentUser.uid)

      onSnapshot(userRef, (doc) => {
        const userDoc = doc.data()
        setWatchlistIDs(userDoc.watching)
      })
      /*  const userDoc = docSnap.data()
      setWatchlistIDs(userDoc.watching) */
    }
    getWatchlist()
    // eslint-disable-next-line
  }, [])
  // get data for each id
  useEffect(() => {
    const fetchShow = async (showID) => {
      const queryURL = `https://api.tvmaze.com/shows/${showID}?embed[]=seasons&embed[]=episodes`

      const response = await fetch(queryURL)
      const result = await response.json()
      if (result) {
        return result
      }
    }
    const addToState = async () => {
      let showArr = []
      for (let id of watchlistIDs) {
        showArr.push(await fetchShow(id))
      }
      setWatchlistDetailed(showArr)
    }
    addToState()
  }, [watchlistIDs])

  return (
    <>
      <div className='container'>
        <div className='mt-4'>
          <p className='display-4 d-inline'>My profile</p>
          <button
            className='btn btn-outline-info ms-3'
            onClick={() => {
              edit && onSubmit()
              setEdit((prev) => !prev)
            }}
          >
            {edit ? 'Done' : 'Edit'}
          </button>
        </div>
        <p className='display-6 mt-4'>Personal Details</p>

        <div className='col-sm-6'>
          <form>
            <div>
              <label htmlFor='name' className='form-label'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                className={`form-control ${!edit && 'bg-secondary text-white'}`}
                value={userData.name}
                disabled={!edit}
                readOnly={!edit}
                onChange={handleOnChange}
              />
            </div>

            <div className='mt-4'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className={`form-control ${'bg-secondary'}`}
                value={userData.email}
                disabled
                readOnly={!edit}
                onChange={handleOnChange}
              />
              <div className='form-text text-warning'>
                Email cannot be edited
              </div>
            </div>
          </form>
        </div>
        <div>
          <div className='display-6 mt-5 mb-3'>Currently watching</div>
          <table className='table table-dark table-striped mt-2'>
            <tbody>
              {watchlistDetailed &&
                watchlistDetailed.map((tvShow, i) => {
                  return (
                    <tr key={i}  className="rounded">
                      <td>
                        <SeriesCard key={i} data={tvShow} />
              
                      </td>
                      <td>
                        <EpisodeCard key={i} data={tvShow}/>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          <div className='d-flex flex-wrap'></div>
        </div>
      </div>
    </>
  )
}
export default Profile
