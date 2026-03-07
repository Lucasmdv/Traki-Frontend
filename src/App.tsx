import Navbar from './components/shared/Navbar'
import { AuthProvider } from './features/auth/context/AuthContext'
import { Outlet } from 'react-router-dom'


function App() {
  return (
    <>
      <AuthProvider>
        <Navbar/>
          <Outlet />
      </AuthProvider>
    </>
  )
}

export default App
