import React from "react";
import PropTypes from "prop-types";
import { AiFillDelete } from "react-icons/ai";

const CommentItem = ({ cmt, onDelete }) => {
  const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2) || '??';

  return (
    <div className="flex items-center gap-3 p-2 border-b border-gray-700">
      <div className="flex items-center justify-center shrink-0 rounded-full w-7 h-7 bg-blue-300 text-sm font-bold text-white">
        {avatar}
      </div>
      <div className="flex text-gray-300 text-xs overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px] border-b border-gray-700">
        {cmt.comment}
      </div>

      <div className="flex items-center gap-3 p-2">
        <button
          onClick={() => onDelete(cmt._id)}
          className="flex items-center justify-center gap-2 text-xs text-white opacity-50"
        >
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  cmt: PropTypes.shape({
    username: PropTypes.string,
    comment: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentItem;
