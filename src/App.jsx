import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp'
import Register from './components/Register'
import NavBar from './components/NavBar/NavBar'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (


    <div className='bg-gray-900'>

      <Router>
        <div>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <div className="min-h-screen">
            <NavBar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />

              </Routes>
            </main>
          </div>
        </div>
      </Router>

    </div>


  )
}

export default App