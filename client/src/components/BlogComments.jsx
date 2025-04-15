import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment } from "../Features/Blog/blogSlice";
import { formatDate } from "../utils/helpers";
import { FaTrash } from "react-icons/fa";

const BlogComments = ({ blogId }) => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);
  const { user } = useSelector((store) => store.user);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    dispatch(addComment({ blogId, comment: { content: comment } }));
    setComment("");
  };

  const handleDelete = (commentId) => {
    dispatch(deleteComment({ blogId, commentId }));
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>

      {blog?.comments?.map((comment) => (
        <div key={comment._id} className="comment">
          <div className="comment-header">
            <span className="comment-author">{comment.user.fullName}</span>
            <span className="comment-date">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p>{comment.content}</p>
          {user?._id === comment.user._id && (
            <button
              className="btn-danger btn-sm"
              onClick={() => handleDelete(comment._id)}
            >
              <FaTrash />
            </button>
          )}
        </div>
      ))}

      {user ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="form-control">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              rows="3"
            />
          </div>
          <button type="submit" className="btn">
            Add Comment
          </button>
        </form>
      ) : (
        <p>Please log in to leave a comment.</p>
      )}
    </div>
  );
};

export default BlogComments;
