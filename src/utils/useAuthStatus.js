import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkStatus, setCheckStatus] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
      setCheckStatus(false)
    })
  }, [])

  return { loggedIn, checkStatus }
}

// https://stackoverflow.com/questions/65505665/protected-route-with-firebase
