import { createContext, useContext, useState } from 'react'

export type IUserContext = {
  userEmail: string
  setUserEmail: (email: string) => void
}

const UserContext = createContext<IUserContext>({} as IUserContext)

export const useUserContext = () => useContext(UserContext)

const Context = ({ children }: { children: React.ReactNode }) => {
  const [userEmail, setUserEmail] = useState<string>('')

  return <UserContext.Provider value={{ userEmail, setUserEmail }}>{children}</UserContext.Provider>
}

export default Context
