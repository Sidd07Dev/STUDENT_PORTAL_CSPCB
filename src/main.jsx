import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {store} from './store/store.js'; 
import { Provider } from 'react-redux';




import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';

import { Route } from 'react-router-dom';

import Dashboard from './components/Dashboard.jsx';

import AccessDenied from './pages/AccessDenied.jsx';

import ResultsPage from './pages/ResultsPage.jsx';
import Courses from './pages/Courses.jsx';


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
     <Route path='' element={<AccessDenied/>}/>
     <Route path='/:refreshToken/:accessToken' element={<AccessDenied/>}/>
     <Route path='results' element={<ResultsPage/>}/>
     <Route path='courses' element={<Courses/>}/>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}> 
  
   <RouterProvider router={router} />
  
   </Provider>
  </StrictMode>,
)
