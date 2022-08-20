import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from '../types'

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
    <>
      {links?.map((link, i) => (
        <div key={i}>{link.url}</div>
      ))}
    </>
  )
}

export default Content
