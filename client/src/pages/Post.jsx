import React, { useCallback, useEffect, useState } from "react";
import Moment from "react-moment";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removePost } from "../redux/features/post/postSlice";
import { toast } from "react-toastify";
import {
  createComment,
  getPostComments,
  deleteComment,
} from "../redux/features/comment/commentSlice";
import CommentItem from "../components/CommentItem";

const Post = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { comments = [] } = useSelector((state) => state.comment);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const removePostHandler = () => {
    dispatch(removePost(params.id));
    toast("Пост был удален");
    navigate("/posts");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!comment) return;

    const postId = params.id;
    dispatch(createComment({ postId, comment }));
    setComment("");
  };

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  const fetchComments = useCallback(() => {
    dispatch(getPostComments(params.id));
  }, [dispatch, params.id]);

  const handleDeleteComment = (postId, commentId) => {
    dispatch(deleteComment({ postId, commentId }));
    toast("Комментарий был удален");
};

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [fetchPost, fetchComments]);

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Загрузка...</div>
    );
  }

  return (
    <div>
      <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
        <Link className="flex" to="/posts">
          Назад
        </Link>
      </button>
      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div className="flex flex-col basis-1/4 flex-grow">
              <div
                className={
                  post?.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"
                }
              >
                {post?.imgUrl && (
                  <img
                    src={`http://localhost:3002/${post.imgUrl}`}
                    alt="img"
                    className="object-cover w-full"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="text-xs text-white opacity-50">
                {post?.username}
              </div>
              <div className="text-xs text-white opacity-50">
                <Moment date={post?.createdAt} format="D.MMM.YYYY" />
              </div>
            </div>
            <div className="text-white text-xl">{post?.title}</div>
            <p className="text-white opacity-60 text-xs pt-4">{post?.text}</p>

            <div className="flex gap-3 items-center mt-2 justify-between">
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                  <AiFillEye /> <span>{post?.views}</span>
                </button>
                <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                  <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
                </button>
              </div>

              {user?._id === post?.author && (
                <div className="flex gap-3 mt-4">
                  <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                    <Link to={`/${params.id}/edit`}>
                      <AiTwotoneEdit />
                    </Link>
                  </button>
                  <button
                    onClick={removePostHandler}
                    className="flex items-center justify-center gap-2 text-xs text-white opacity-50"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700 flex-col gap-2 rounded-sm">
          <form className="flex gar-2" onSubmit={submitHandler}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Добавьте комментарий"
              className="text-black w-full rounded-sm bg-gray-400 p-2 text-xs outline-none placeholder:text-gray-700 "
            />
            <button
              type="submit"
              className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
            >
              Отправить
            </button>
          </form>

          {comments.length > 0 ? (
            comments.map((cmt) => {
              if (cmt && cmt._id) {
                return <CommentItem key={cmt._id} cmt={cmt}  onDelete={() => handleDeleteComment(params.id, cmt._id)} />;
              }
              return null;
            })
          ) : (
            <p className="text-gray-300 text-xs mt-4">Комментариев пока нет</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
