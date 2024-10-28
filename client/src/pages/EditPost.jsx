import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import { updatePost } from "../redux/features/post/postSlice";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`);
      setTitle(data.title);
      setText(data.text);
      setOldImage(data.imgUrl);
    } catch (error) {
      console.error("Ошибка загрузки поста:", error);
      toast.error("Не удалось загрузить пост");
    }
  }, [params.id]);

  const submitHandler = async () => {
    if (!title || !text) {
      toast.error("Пожалуйста, заполните все поля.");
      return;
    }

    setLoading(true);
    const updatedPost = new FormData();
    updatedPost.append('title', title);
    updatedPost.append('text', text);
    updatedPost.append('id', params.id);
    updatedPost.append('image', newImage);

    try {
      await dispatch(updatePost(updatedPost));
      toast.success("Пост успешно обновлен!");
      navigate('/posts');
    } catch (error) {
      console.error("Ошибка обновления поста:", error);
      toast.error("Не удалось обновить пост");
    } finally {
      setLoading(false);
    }
  };

  const clearFormHandler = () => {
    setTitle('');
    setText('');
    setOldImage('');
    setNewImage(null);
  }

  useEffect(() => {
    fetchPost()
  }, [fetchPost]);

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Прикрепить изорбажение:
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            setNewImage(e.target.files[0]);
            setOldImage("");
          }}
          aria-label="Прикрепить изображение"
        />
      </label>
      <div className="flex object-cover py-2">
        {oldImage && (
          <img src={`http://localhost:3002/${oldImage}`} alt={oldImage.name} />
        )}
        {newImage && (
          <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
        )}
      </div>

      <label className="text-xs text-white opacity-70">
        Заголовок поста:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          aria-label="Заголовок поста"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Текст поста:
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Текст поста"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"
          aria-label="Текст поста"
        />
      </label>

      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={submitHandler}
          className={`flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? 'Сохранение...' : 'Сохранить'}
        </button>

        <button
          onClick={clearFormHandler}
          className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
        >
          Отменить
        </button>
      </div>
    </form>
  );
};

export default EditPost;
