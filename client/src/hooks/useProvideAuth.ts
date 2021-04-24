import { useState, useMemo, useEffect } from 'react'
import axios from 'axios'
import useLocalStorage from './useLocalStorage'

// Provider hook that creates auth object and handles state
export default function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useLocalStorage('token', '')
  const isLoggedIn = useMemo(() => {
    return user && token
  }, [user, token])

  // Log user in if token exists from previous session
  useEffect(() => {
    authenticate()
  })

  const login = async (email: string, password: string) => {
    axios
      .post('/api/users/login', { email, password })
      .then(res => {
        setUser(res.data.user)
        setToken(res.data.token)
      })
      .catch(e => console.log(e.response.data.msg))
  }
  const register = async (username: string, email: string, password: string, password2: string) => {
    try {
      await axios.post('/api/users/register', { username, email, password, password2 })
    } catch (e) {
      console.log('Error registering')
    }
  }

  const authenticate = async () => {
    try {
      if (!token) return
      const res = await axios.get('/api/users/authenticate', { params: { token } })
      setUser(res.data.user)
    } catch (e) {
      console.log(e)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  return {
    user,
    login,
    register,
    authenticate,
    logout,
    isLoggedIn,
    token,
  }
}
