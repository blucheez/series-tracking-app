import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'

function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent.')
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (error) {
      toast.error(error.code)
    }
  }

  return (
    <>
      <div className='container d-flex flex-column align-items-center'>
        <header className='display-6 my-4'>Send password reset email</header>

        <div className='col col-lg-3'>
          <form onSubmit={handleSubmit}>
            <input
              className='form-control mb-3'
              type='email'
              name='email'
              id='email'
              placeholder='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className='btn btn-outline-warning w-100' type='submit'>
              Go!
            </button>
          </form>
          <div className='mt-2 d-flex justify-content-between'>
            <Link to='/register' className='text-warning text-decoration-none'>
              Register
            </Link>
            <Link to='/login' className='text-warning text-decoration-none'>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default ForgotPassword
