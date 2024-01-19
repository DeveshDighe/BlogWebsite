
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import CreateBlog from './Component/CreateBlog';
import BlogList from './Component/BlogList';
import Showblog from './Component/Showblog';
import Edit from './Component/Edit';
import SignUp from './Component/SignUp';
import SignIn from './Component/SignIn';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import Navbarr from './Component/Navbarr';
import Footer from './Component/Footer';


function App() {

  const [userName, setuserName] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setuserName(user.displayName)
      }
      else {
        setuserName(null);
      }
    })
  }, [])
  return (
    <>
      <Navbarr />
      <Routes>
        <Route path='/createBlogs' element={<CreateBlog />} />
        <Route path='/' element={<BlogList name={userName} />} />
        <Route path='/showBlog/:id' element={<Showblog />} />
        <Route path='/editBlog/:id' element={<Edit />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/signIn' element={<SignIn />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
