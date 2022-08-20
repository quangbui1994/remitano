import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from '../types'
import ItemsList from './ItemsList'
import { Container } from '@mui/material'

const Content = () => {
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    const fetchLinks = async () => {
      const data = await axios.get(
        'https://fu6i0unm99.execute-api.us-east-1.amazonaws.com/prod/links',
      )
      setLinks(JSON.parse(data.data.body).Items)
    }

    fetchLinks()
  }, [])

  useEffect(() => {
    console.log(links)
  }, [links])

  return (
    <Container maxWidth='sm'>
      <ItemsList links={links} />
    </Container>
  )
}

export default Content
