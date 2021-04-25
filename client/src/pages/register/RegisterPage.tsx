import React, { useState } from 'react'
import { Button, TextField, Link, Grid, Typography, Box, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import useAuth from '../../hooks/useAuth'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
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

export default function RegisterPage() {
  const classes = useStyles()
  const history = useHistory()
  const { register } = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [feedback, setFeedback] = useState('')

  const handleRegister = () => {
    register(username, email, password, password2).then(res => {
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
            Sign up
          </Typography>
          <form onSubmit={e => e.preventDefault()} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete='uname'
                  name='username'
                  variant='outlined'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password2}
                  onChange={e => setPassword2(e.target.value)}
                  variant='outlined'
                  required
                  fullWidth
                  name='password2'
                  label='Re-enter Password'
                  type='password'
                  id='password2'
                />
              </Grid>
            </Grid>
            <Button type='submit' onClick={handleRegister} fullWidth variant='contained' color='primary' className={classes.submit}>
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link component={RouterLink} to='/login' variant='body2'>
                  Already have an account? Sign in
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
