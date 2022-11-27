import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { FcGoogle } from 'react-icons/fc'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleGoogle = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          username: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/profile')
    } catch (error) {
      toast.error('Could not authorize with Google')
    }
  }

  return (
    <div>
      Sign {location.pathname === 'register' ? 'up' : 'in'} with
      <Link className='fs-1 d-block' onClick={handleGoogle}>
        <FcGoogle />
      </Link>
    </div>
  )
}
export default OAuth
