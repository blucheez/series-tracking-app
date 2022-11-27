import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: formData.username,
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <div className='container d-flex flex-column align-items-center'>
      <header className='display-6 my-4'>Sign Up</header>

      <div className='col col-lg-3'>
        <form onSubmit={handleSubmit}>
          <input
            className='form-control mb-3'
            type='text'
            name='username'
            id='username'
            placeholder='username'
            value={formData.username}
            onChange={onChange}
          />
          <input
            className='form-control mb-3'
            type='email'
            name='email'
            id='email'
            placeholder='email'
            value={formData.email}
            onChange={onChange}
          />
          <div className='input-group mb-3'>
            <input
              className='form-control'
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='password'
              placeholder='password'
              value={formData.password}
              onChange={onChange}
            />
            <span
              role='button'
              className='input-group-text'
              id='basic-addon1'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            </span>
          </div>
          <button className='btn btn-outline-warning w-100' type='submit'>
            Go!
          </button>
        </form>
        <div className='mt-2 d-flex justify-content-between'>
          <Link to='/login' className='text-warning text-decoration-none'>
            Log in
          </Link>
          <Link
            to='/forgot-password'
            className='text-warning text-decoration-none'
          >
            Forgot password
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}
export default Register
