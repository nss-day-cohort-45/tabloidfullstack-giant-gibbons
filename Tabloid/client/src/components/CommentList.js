import React, { useContext, useEffect } from "react";
import { CommentContext } from "../providers/CommentProvider";
import Comment from "./Comment";

export const CommentList = () => {
  const { comments, getAllCommentsById } = useContext(CommentContext);

  useEffect(() => {
    getAllCommentsById();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {comments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default CommentList;
