import { useState } from 'react'
import Logo from '../youtube.svg'
import { Grid, Button, TextField } from '@mui/material'
import { Auth } from 'aws-amplify'
import { useUserContext } from '../context'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginRight: 10,
  width: 130,
  height: 10,
}))

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  marginRight: 10,
}))

const Header: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { setUserEmail, userEmail } = useUserContext()

  const login = async () => {
    try {
      const { user } = await Auth.signIn({
        username: email,
        password,
      })
      setUserEmail(user.username)
      setEmail('')
      setPassword('')
    } catch (error: any) {
      console.log(error.message)
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
      setUserEmail(user.username)
      setEmail('')
      setPassword('')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    try {
      await Auth.signOut({ global: true })
      setUserEmail('')
    } catch (error: any) {
      console.log(error.message)
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
      <Grid container justifyContent='flex-end' component='form' padding={1}>
        <p style={{ marginRight: 10 }}>Welcome {userEmail}</p>
        <Link to='/share'>Share a movie</Link>
        <StyledButton onClick={logout} variant='contained'>
          Logout
        </StyledButton>
      </Grid>
    </Grid>
  )

  return (
    <Grid container spacing={2} style={{ height: 75 }}>
      <Grid item xs={1}>
        <img src={Logo} alt='website-logo' />
      </Grid>
      {userEmail ? authHeader : unAuthHeader}
    </Grid>
  )
}

export default Header
