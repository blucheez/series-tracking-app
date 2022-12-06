import { useEffect, useState } from 'react'
import { SiPivotaltracker } from 'react-icons/si'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStatus } from '../utils/useAuthStatus'
import { getAuth } from 'firebase/auth'

function Navbar() {
  const { loggedIn } = useAuthStatus()
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()
  const auth = getAuth()
  const addActiveClass = (route) => {
    if (route === location.pathname) {
      return true
    }
  }
  const handleLogout = () => {
    auth.signOut()
    navigate('/login')
  }

  useEffect(() => {
    setIsLoggedIn(loggedIn)
  }, [isLoggedIn, loggedIn])

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark sticky-top'>
      <div className='container-fluid'>
        <Link
          className='navbar-brand d-flex justify-content-center align-items-center'
          to='/'
        >
          <SiPivotaltracker className='fs-5 me-2' />
          Series Tracker
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link
                className={addActiveClass('/') ? 'nav-link active' : 'nav-link'}
                aria-current='page'
                to='/'
              >
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  addActiveClass('/series') ? 'nav-link active' : 'nav-link'
                }
                to='/series'
              >
                Series
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  addActiveClass('/calendar') ? 'nav-link active' : 'nav-link'
                }
                to='/calendar'
              >
                Calendar
              </Link>
            </li>
          </ul>

          {isLoggedIn ? (
            <div className='me-2'>
              <Link to='/profile'>
                <button className='btn btn-outline-warning me-2'>
                  Profile
                </button>
              </Link>
              <Link onClick={handleLogout}>
                <button className='btn btn-outline-danger'>Logout</button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to='/login'>
                <button className='btn btn-outline-warning me-2'>Log in</button>
              </Link>
              <Link to='/register'>
                <button className='btn btn-outline-warning'>Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
export default Navbar
