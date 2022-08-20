import axios from 'axios'
import ItemsList from './ItemsList'
import { CircularProgress, Container, Grid, Typography } from '@mui/material'
import { useQuery } from 'react-query'

const fetchLinks = async () => {
  const data = await axios.get(`${process.env.REACT_APP_API_GATEWAY}/links`)
  return JSON.parse(data.data.body).Items
}

const Content = () => {
  const { data, isLoading, isError } = useQuery('links', fetchLinks, {
    cacheTime: 10000,
    staleTime: 10000,
  })

  if (isLoading) {
    return (
      <Grid container justifyContent='center' paddingTop={10}>
        <CircularProgress />
      </Grid>
    )
  }

  if (isError) {
    return (
      <Grid container justifyContent='center' paddingTop={10}>
        <Typography variant='h3'>There is something wrong.</Typography>
      </Grid>
    )
  }

  return (
    <Container maxWidth='sm'>
      <ItemsList links={data} />
    </Container>
  )
}

export default Content
