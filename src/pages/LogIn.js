import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'

function LogIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      if (userCredential.user) {
        navigate('/profile')
      }
    } catch (error) {
      if (error) {
        toast.error(error.code)
      }
    }
  }

  return (
    <>
      <div className='container d-flex flex-column align-items-center'>
        <header className='display-6 my-4'>Sign In</header>

        <div className='col col-lg-3'>
          <form onSubmit={handleSubmit}>
            <input
              className='form-control mb-3'
              type='email'
              name='email'
              id='email'
              placeholder='email'
              required
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
                required
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
            <Link to='/register' className='text-warning text-decoration-none'>
              Register
            </Link>
            <Link
              to='/forgot-password'
              className='text-warning text-decoration-none'
            >
              Forgot password
            </Link>
          </div>
          <div className='text-center text-warning mt-5'>
            <OAuth />
          </div>
        </div>
      </div>
    </>
  )
}
export default LogIn
