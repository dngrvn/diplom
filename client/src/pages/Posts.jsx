import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import axios from "../utils/axios"

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyPosts = async () => {
    try{
      const {data} = await axios.get('/posts/user/me');
      setPosts(data);
    }catch (error) {
      console.error(error);
      setError('Ошибка при загрузке постов.');
    } finally {
      setLoading(false);
      }
    }

  useEffect(() => {
    fetchMyPosts();
  }, []);

  if (loading) {
    return <div className="text-xl text-center text-white py-10">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-xl text-center text-white py-10">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="text-xl text-center text-white py-10">Постов пока нет.</div>; // Сообщение об отсутствии постов
  }

return <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
    {posts.map((post, idx) => {
      if (!post || !post._id) {
        console.error('Post is null or missing _id:', post);
        return null;
      }
      return <PostItem key={post._id} post={post} />;
    })}
  </div>
}

export default Posts
