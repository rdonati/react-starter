import React from 'react'

const AuthContext = React.createContext<any>({
  user: null,
  token: null,
  isLoggedIn: false,
  login: (email: string, password: string) => Promise.resolve(),
  authenticate: (token: string) => {
    console.log('placeholder authenticate function')
    return Promise.resolve()
  },
  register: (username: string, email: string, password: string, password2: string) => Promise.resolve(),
})

export default AuthContext
