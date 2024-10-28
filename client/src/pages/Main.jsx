import React, { useEffect } from "react";
import PostItem from "../components/PostItem";
import PopularPosts from "../components/PopularPosts";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/features/post/postSlice";

const Main = () => {
  const dispatch = useDispatch();
  const {posts, popularPosts} = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if (!posts ||!posts.length) {
    return (
    <div className="text-xl text-center text-white py-10">
      Постов не существует.
    </div>
    )
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
        <div className="basis-1/5">
        <div className="text-xs uppercase text-white">
          Популярное: 
        </div>
        {popularPosts.length > 0 ?(
          popularPosts.map((post) => (
          <PopularPosts key={post._id} post={post} />
        )) 
      ) :(
        <div className="text-xs text-gray-500">Нет данных</div>
      )}
        </div>
      </div>
    </div>
  );
};

export default Main;
