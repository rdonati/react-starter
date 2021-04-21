import { useState } from 'react'
import axios from 'axios'
import useLocalStorage from './useLocalStorage'

// Provider hook that creates auth object and handles state
export default function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [authToken, setAuthToken] = useLocalStorage('token', '')

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post('/api/users/login', { email, password })
      setUser(res.data.user)
      setAuthToken(res.data.token)
    } catch (e) {
      console.log(`Error loggin in ${e}`)
    }
  }
  const register = async (username: string, email: string, password: string, password2: string) => {
    try {
      await axios.post('/api/users/register', { username, email, password, password2 })
    } catch (e) {
      console.log('Error registering')
    }
  }

  const logout = () => {
    setUser(null)
    setAuthToken(null)
  }

  return {
    user,
    login,
    register,
    logout,
    token: authToken,
  }
}
