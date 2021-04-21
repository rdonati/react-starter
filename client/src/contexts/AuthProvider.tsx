import useProvideAuth from '../hooks/useProvideAuth'
import AuthContext from './AuthContext'

export default function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
