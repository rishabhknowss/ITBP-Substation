import { BrowserRouter, Routes , Route } from 'react-router-dom';
import './App.css'
import MainDashboard from './pages/main-dashboard'
import Login  from './pages/Login';
function App() {


  return (
    <>
    <BrowserRouter >

    <Routes>
      <Route path='/' element={<Login />} />
      <Route path="/dashboard" element={<MainDashboard />}  />
    </Routes>


    </BrowserRouter>
     
    </>
  )
}

export default App
