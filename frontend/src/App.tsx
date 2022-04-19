import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';
import Home from './components/home';
import Poem from './components/poem';
import Search from './components/search';
import Profile from './components/profile';
import Welcome from './components/welcome';
import Login from './components/welcome/login';
import Signup from './components/welcome/signup';
import PO3 from './po3';
import Privacy from './components/privacy';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/'>
            <Route path='/' element={<PO3 />}>
              <Route path='profile/' element={<Profile />}></Route>
              <Route path='search' element={<Search />}></Route>
              <Route path='/home' element={<Home />} />
              <Route path='poem/:author/:title' element={<Poem />}></Route>
              <Route path='privacy' element={<Privacy />}></Route>
              <Route path='/' element={<Home />}></Route>
            </Route>
            <Route path='profile/' element={<Profile />}></Route>
            <Route path='welcome/' element={<Welcome />}></Route>
            <Route path='login/' element={<Login />}></Route>
            <Route path='signup/' element={<Signup />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
