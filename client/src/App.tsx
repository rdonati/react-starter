import NavBar from './components/NavBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthProvider from './contexts/AuthProvider'

// Pages
import HomePage from './pages/home'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'

const AppWrapper = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>
}

function App() {
  return (
    <AppWrapper>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
        </Switch>
      </Router>
    </AppWrapper>
  )
}

export default App
