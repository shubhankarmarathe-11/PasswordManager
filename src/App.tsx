import {Homepage,Login,Signup,AddPassword,NotFound} from './components/Exportsfunc';
import { Routes,Route } from "react-router-dom"

import './App.css'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={'Hello'}/>
      
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/Dashboard' element={<Homepage/>}/>
      <Route path='/Dashboard/Addpassword' element={<AddPassword/>}/>
      <Route path='*' element={<NotFound/>}/>

    </Routes>
    </>
  )
}

export default App
