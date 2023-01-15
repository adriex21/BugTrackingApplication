import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


const initialData = {
  loggedin: false,
  studentData: {}
}

function App() {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const getStudentData = async () =>{
      
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route exact path='/'>
          <Dashboard data={data}></Dashboard>
        </Route>

        <Route path='/login'>
          <Login />
        </Route>

      </Routes>
    </Router>

    // <RouterProvider router={router} user={user} />
  );
}

export default App;
