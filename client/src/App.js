import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import AddPost from './pages/AddPost';
import Post from './pages/Post';
import EditPost from './pages/EditPost';
import Posts from './pages/Posts';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from './redux/features/auth/authSlice';
import Welcome from './pages/Welcome';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])
  return (
    <Layout>
      <Routes>
      <Route path="/" element ={<Welcome/>}/>
        <Route path="/main" element ={<Main/>}/>
        <Route path="/posts" element ={<Posts/>}/>
        <Route path="/:id" element ={<Post/>}/>
        <Route path="/:id/edit" element ={<EditPost/>}/>
        <Route path="/new" element ={<AddPost/>}/>
        <Route path="/register" element ={<Register/>}/>
        <Route path="/login" element ={<Login/>}/>
      </Routes>

      <ToastContainer position='bottom-right'/>

    </Layout>
  );
}

export default App;
