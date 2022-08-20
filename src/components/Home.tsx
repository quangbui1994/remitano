import { Container, Divider } from '@mui/material'
import Content from './Contents'
import Header from './Header'

const Home = () => {
  return (
    <Container maxWidth='md'>
      <Header />
      <Divider variant='middle' />
      <Content />
    </Container>
  )
}

export default Home
