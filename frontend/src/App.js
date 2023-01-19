import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import CreateTeam from './pages/CreateTeam/CreateTeam'
import TeamProjects from './pages/TeamProjects/TeamProjects'
import AddProject from './pages/AddProject/AddProject'
import Project from './pages/Project/Project';
import Bug from './pages/Bug/Bug';
import BugCommit from './pages/Bug/AddCommit'
import AddBug from './pages/AddBug/AddBug';
import AddMember from './pages/AddMember/AddMember'
import SignUp from './pages/Register/SignUp'

import RegisterTester from './pages/RegisterTester/RegisterTester'


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
        <Route path='/create-team' element={<CreateTeam data={data} />}></Route>
        <Route path='/:teamName/projects' element={<TeamProjects data={data} />}></Route>
        <Route path='/:teamName/add-project' element={<AddProject data={data} />}></Route>
        <Route path='/:project_id/view' element={<Project data={data} />}></Route>
        <Route path='/:project_id/add-bug' element={<AddBug data={data} />}></Route>
        <Route path='/:bug_id/view-bug' element={<Bug data={data} />}></Route>
        <Route path='/:project_id/:bug_id/add-commit' element={<BugCommit data={data} />}></Route>
        <Route path='/:teamName/addMembers' element={<AddMember data={data} />}></Route>
        <Route path='/signup' element={<SignUp data={data}/>}></Route>




      </Routes>
    </BrowserRouter>

    // <RouterProvider router={router} user={user} />
  );
}

export default App;
