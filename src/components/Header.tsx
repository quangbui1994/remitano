import { useState } from 'react'
import Logo from '../youtube.svg'
import { Grid, Button, TextField } from '@mui/material'
import { Auth } from 'aws-amplify'
import { useUserContext } from '../context'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import Popup from './Popup'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginRight: 10,
  width: 130,
  height: 10,
}))

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  marginRight: 10,
  height: 40,
}))

const Header: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { setUserEmail, userEmail } = useUserContext()
  const [errOpen, setErrOpen] = useState<boolean>(false)
  const [successOpen, setSuccessOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [successMesssage, setSuccessMessage] = useState<string>('')

  const login = async () => {
    try {
      const { user } = await Auth.signIn({
        username: email,
        password,
      })
      setUserEmail(user.username)
      setEmail('')
      setPassword('')
      setSuccessOpen(true)
      setSuccessMessage('Login successfully')
    } catch (error: any) {
      setError(error.message)
      setErrOpen(true)
    }
  }

  const signup = async () => {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        autoSignIn: {
          enabled: true,
        },
      })
      setUserEmail(email)
      setEmail('')
      setPassword('')
      setSuccessOpen(true)
      setSuccessMessage('Signup successfully')
    } catch (error: any) {
      setError(error.message)
      setErrOpen(true)
    }
  }

  const logout = async () => {
    try {
      await Auth.signOut({ global: true })
      setUserEmail('')
      setSuccessOpen(true)
      setSuccessMessage('Signout successfully')
    } catch (error: any) {
      setError(error.message)
      setErrOpen(true)
    }
  }

  const unAuthHeader = (
    <Grid item xs={11}>
      <Grid container justifyContent='flex-end' component='form' padding={1}>
        <StyledTextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size='small'
          id='outlined-required'
          label='Email'
        />
        <StyledTextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          size='small'
          id='outlined-password-input'
          label='Password'
          type='password'
        />
        <StyledButton onClick={login} variant='contained'>
          Log in
        </StyledButton>
        <StyledButton onClick={signup} variant='contained'>
          Sign up
        </StyledButton>
      </Grid>
    </Grid>
  )

  const authHeader = (
    <Grid item xs={11}>
      <Grid container justifyContent='flex-end' component='form' padding={1} alignItems='center'>
        <p style={{ marginRight: 10 }}>Welcome {userEmail}</p>
        <StyledButton variant='outlined'>
          <Link to='/share' style={{ textDecoration: 'none', color: '#000' }}>
            Share a movie
          </Link>
        </StyledButton>
        <StyledButton onClick={logout} variant='contained'>
          Logout
        </StyledButton>
      </Grid>
    </Grid>
  )

  return (
    <Grid container spacing={2} style={{ height: 75 }}>
      <Grid item xs={1}>
        <Link to='/'>
          <img src={Logo} alt='website-logo' />
        </Link>
      </Grid>
      {userEmail ? authHeader : unAuthHeader}
      <Popup
        setSuccessOpen={setSuccessOpen}
        successOpen={successOpen}
        errOpen={errOpen}
        setErrOpen={setErrOpen}
        error={error}
        successMesssage={successMesssage}
      />
    </Grid>
  )
}

export default Header
