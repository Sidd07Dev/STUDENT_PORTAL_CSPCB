import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';

import { Route } from 'react-router-dom';

import Dashboard from './components/Dashboard.jsx';
import ManageStudents from './pages/ManageStudents.jsx';
import ManageAlumni from './pages/ManageAlumni.jsx';
import ManageNotices from './pages/ManageNotices.jsx';
import ManageGallery from './pages/ManageGallery.jsx';
import Profile from './pages/Profile.jsx';
import ManageStaff from './pages/ManageStaff.jsx';
import ManageSettings from './pages/ManageSettings.jsx';
import AccessDenied from './pages/AccessDenied.jsx';


// const router = createBrowserRouter([
//   {
//     path:'/',
//     element:<Layout/>,
//     children:[
//       {
//         path:"",
//         element:<HomePage/>
//       },
//       {
//         path:"About",
//         element:null
//       },{
//         path:"question",
//         element:<ResultsPage/>
//       },{
//         path:"contact",
//         element:<ContactUs />
//       }

//     ]
//   }
// ])


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
     <Route path='' element={<Dashboard/>}/>
     <Route path='/:refreshToken/:accessToken' element={<AccessDenied/>}/>
     
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
