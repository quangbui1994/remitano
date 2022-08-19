import { useState } from 'react'
import Logo from '../youtube.svg'
import { Grid, Button, TextField } from '@mui/material'
import { Auth } from 'aws-amplify'

import { styled } from '@mui/material/styles'

const StyledTextField = styled(TextField)(({ theme }) => ({
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

  const login = async () => {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const signup = async () => {
    try {
      const { user } = await Auth.signIn({
        username: email,
        password,
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={1}>
        <img src={Logo} alt='website-logo' />
      </Grid>
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
    </Grid>
  )
}

export default Header
