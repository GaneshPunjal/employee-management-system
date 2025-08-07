
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import { ListEmployeeComponent } from './components/ListEmployeeComponent'
import EmployeeComponent from './components/EmployeeComponent'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <BrowserRouter>
      <HeaderComponent/>

      <ToastContainer position='top-right' autoClose={3000} />

      <Routes>
        <Route path='/' element = {<ListEmployeeComponent/>}></Route>
        <Route path='/employees' element = {<ListEmployeeComponent/>}></Route>
        <Route path='/add-employee' element = {<EmployeeComponent/>}></Route>
        <Route path='/edit-employee/:id' element = {<EmployeeComponent/>}></Route>
      </Routes>
      <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
