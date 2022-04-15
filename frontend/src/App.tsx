import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';
import Home from './components/home';
import Poem from './components/poem';
import Search from './components/search';
import Profile from './components/profile';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/'>
            <Route path='/' element={<Home />} />
            <Route path='poem/:author/:title' element={<Poem />}></Route>
            <Route path='search' element={<Search />}></Route>
            <Route path='profile/:uid' element={<Profile />}></Route>
            <Route path='profile/' element={<Profile />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
