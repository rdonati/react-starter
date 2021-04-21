import React from 'react'

const AuthContext = React.createContext<any>({
  user: null,
  token: null,
  login: (email: string, password: string) => Promise.resolve(),
  register: (username: string, email: string, password: string, password2: string) => Promise.resolve(),
})

export default AuthContext
