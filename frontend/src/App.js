import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";


const initialData = {
  loggedin: false,
  studentData: {}
}

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const checkLoggedIn = async () =>{
      if(localStorage.getItem('token')){  
          const response = await fetch('http://localhost:3002/api/student/getStudent', {
              method: 'GET',
              headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
          })
          try {
              const received = await response.json();
              if(received.msg === "Student doesn't exist") return setData(initialData)
              return setData({loggedin: true, studentData: received})
          }
          catch(error) {
              console.log('ERROR: '+ error);
          }
      }else{
        setData(initialData)
      }
    }
    checkLoggedIn()
  }, [])

  if(!data) return

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard data={data}></Dashboard>}></Route>
        <Route path='/login' element={<Login data={data} />}></Route>
      </Routes>
    </BrowserRouter>

    // <RouterProvider router={router} user={user} />
  );
}

export default App;
