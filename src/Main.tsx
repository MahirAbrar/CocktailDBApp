import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs'
import Cocktails from './components/Cocktails';
import LoginPage from './components/LoginPage';
const Main = () => {
return (         
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/cocktails' element={<Cocktails/>} />
    <Route path='/aboutus' element={<AboutUs/>} />
    <Route path='/login' element={<LoginPage />} />
  </Routes>
);
}
export default Main;