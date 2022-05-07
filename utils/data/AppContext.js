import { createContext, useState } from 'react'

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  return (
    <AppContext.Provider value={{ progress, setProgress, loading, setLoading }} >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext