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
    return axios
      .post('/api/users/login', { email, password })
      .then(res => {
        setUser(res.data.user)
        setToken(res.data.token)
        return { success: true, msg: `Welcome, ${res.data.user.username}` }
      })
      .catch(e => {
        const msg = e.response.data.msg
        console.log(msg)
        return { success: false, msg }
      })
  }
  const register = async (username: string, email: string, password: string, password2: string) => {
    return axios
      .post('/api/users/register', { username, email, password, password2 })
      .then(_ => {
        login(email, password)
        return { success: true, msg: 'User registered successfully' }
      })
      .catch(e => {
        const msg = e.response.data.msg
        console.log(msg)
        return { success: false, msg }
      })
  }

  const authenticate = async () => {
    if (!token) return
    axios
      .get('/api/users/authenticate', { params: { token } })
      .then(res => {
        console.log(res)
        setUser(res.data.user)
      })
      .catch(e => {
        console.log(e?.response?.data?.msg)
      })
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
