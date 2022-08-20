export interface LinkData {
  title: string
  author_name: string
  author_url?: string
  type?: string
  height?: number
  width?: number
  version?: string
  provider_name?: string
  provider_url?: string
  thumbnail_height?: number
  thumbnail_width?: number
  thumbnail_url: string
  html?: string
}

export interface Link extends Pick<LinkData, 'title' | 'author_name' | 'thumbnail_url'> {
  id: string
  userEmail: string
  url: string
}
