import { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import { doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

function Profile() {
  /* const navigate = useNavigate() */
  const auth = getAuth()
  const [edit, setEdit] = useState(false)
  const [userData, setUserData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

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
                className={`form-control ${'bg-secondary text-white'}`}
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
      </div>
    </>
  )
}
export default Profile
