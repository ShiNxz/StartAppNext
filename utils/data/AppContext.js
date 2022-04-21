import { createContext, useState } from 'react'

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [progress, setProgress] = useState(0)

  return (
      <AppContext.Provider value={{ progress, setProgress }} >
        {children}
      </AppContext.Provider>
  )
}

export default AppContext