import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../utils/useAuthStatus'

function PrivateRoute() {
  const { loggedIn, checkStatus } = useAuthStatus()

  if(checkStatus) {
    return <h3>Loading...</h3>
  }

  if (loggedIn) {
    return <Outlet />
  } else {
    return <Navigate to='/login' />
  }
}
export default PrivateRoute
