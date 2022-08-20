import { useState } from 'react'
import { Container, Divider, Button, TextField, Stack } from '@mui/material'
import Header from './Header'
import axios from 'axios'
import { useUserContext } from '../context'
import { v4 as uuidv4 } from 'uuid'
import { LinkData } from '../types'
import Popup from './Popup'
import { useNavigate } from 'react-router-dom'

const Share = () => {
  const [url, setUrl] = useState<string>('')
  const { userEmail } = useUserContext()
  const [errOpen, setErrOpen] = useState<boolean>(false)
  const [successOpen, setSuccessOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [successMesssage, setSuccessMessage] = useState<string>('')
  const navigate = useNavigate()

  const share = async () => {
    try {
      const {
        data: { title, author_name, thumbnail_url },
      } = await axios.get<LinkData>(`https://www.youtube.com/oembed?url=${url}&format=json`)
      await axios.post('https://fu6i0unm99.execute-api.us-east-1.amazonaws.com/prod/links', {
        id: uuidv4(),
        url,
        title,
        author_name,
        thumbnail_url,
        userEmail,
      })
      setUrl('')
      setSuccessMessage('Shared completely')
      setSuccessOpen(true)
    } catch (error: any) {
      setError('There is something wrong')
      setErrOpen(true)
    }
  }

  return (
    <Container maxWidth='md'>
      <Header />
      <Divider variant='middle' />
      <Stack
        sx={{
          width: 300,
          height: 150,
          border: '1px solid rgba(0, 0, 0, 0.5);',
          borderRadius: 3,
          margin: '0 auto',
          marginTop: 20,
          padding: 5,
        }}
        spacing={1}
      >
        <TextField
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          size='small'
          id='url'
          label='Youtube URL'
          style={{ marginBottom: 15 }}
        />
        <Button onClick={share} variant='contained'>
          Share
        </Button>
        <Button onClick={() => navigate('/')} variant='contained'>
          Home
        </Button>
      </Stack>
      <Popup
        setSuccessOpen={setSuccessOpen}
        successOpen={successOpen}
        errOpen={errOpen}
        setErrOpen={setErrOpen}
        error={error}
        successMesssage={successMesssage}
      />
    </Container>
  )
}

export default Share
