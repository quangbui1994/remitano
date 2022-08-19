import Logo from '../youtube.svg'
import { Grid, Button, TextField } from '@mui/material'

import { styled } from '@mui/material/styles'

const StyledTextField = styled(TextField)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginRight: 10,
  width: 130,
  height: 10,
}))

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff',
}))

const Header = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={1}>
        <img src={Logo} alt='website-logo' />
      </Grid>
      <Grid item xs={11}>
        <Grid container justifyContent='flex-end' component='form' padding={1}>
          <StyledTextField size='small' id='outlined-required' label='Email' />
          <StyledTextField
            size='small'
            id='outlined-password-input'
            label='Password'
            type='password'
          />
          <StyledButton variant='contained'>Log in</StyledButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Header
