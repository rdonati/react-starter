import { useState } from 'react'
import { Button, TextField, Link, Grid, Typography, Container, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { useHistory } from 'react-router-dom'

import { Link as RouterLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: '1fr auto 1fr',
  },
  alignVertically: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  alert: {
    height: '3rem',
  },
}))

export default function LoginPage() {
  const classes = useStyles()
  const { login } = useAuth()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [feedback, setFeedback] = useState('')

  const handleLogin = async () => {
    login(email, password).then(res => {
      res.success ? history.push('/') : setFeedback(res.msg)
    })
  }

  return (
    <Container maxWidth='sm'>
      <Box component='main' className={classes.root}>
        <Box className={classes.alignVertically}>
          <Alert className={classes.alert} style={{ visibility: !!feedback ? 'visible' : 'hidden' }} severity='error'>
            {feedback}
          </Alert>
        </Box>
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>

          <form onSubmit={e => e.preventDefault()} className={classes.form} noValidate>
            <TextField
              value={email}
              onChange={e => setEmail(e.target.value)}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              value={password}
              onChange={e => setPassword(e.target.value)}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button type='submit' onClick={handleLogin} fullWidth variant='contained' color='primary' className={classes.submit}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* PLACEHOLDER */}
        <div />
      </Box>
    </Container>
  )
}
