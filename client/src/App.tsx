import NavBar from './components/NavBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthProvider from './contexts/AuthProvider'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// Pages
import HomePage from './pages/home'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import ToastProvider from './contexts/ToastProvider'

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
  },
})

const AppWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  )
}

function App() {
  const classes = useStyles()
  return (
    <AppWrapper>
      <Router>
        <Box className={classes.root}>
          <NavBar />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
          </Switch>
        </Box>
      </Router>
    </AppWrapper>
  )
}

export default App
