// import React from 'react'

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp'
import Login from './components/Login'
// import NavBar from './components/NavBar/NavBar'
import Dashboard from './pages/Dashboard'
import MainLayout from '../src/Layout/MainLayout'

// const App = () => {
//   return (


//     <div className='bg-gray-900'>
//       <Router> 
//         <div>
//           <Routes>
//             <Route path="/signup" element={<SignUp />}  />
            
//           </Routes>
//           <div className="min-h-screen">
//             <NavBar />
//             <main className="container mx-auto px-4 py-8">
//               <Routes>
//                 <Route path="/" element={<Dashboard />} />

//               </Routes>
//             </main>
//           </div>
//         </div>
//       </Router>

//     </div>


//   )
// }

// export default App


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path='/main' element={<MainLayout/>} />
          <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
