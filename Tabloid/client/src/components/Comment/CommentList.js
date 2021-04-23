import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import Comment from "./Comment";
import { useParams } from "react-router-dom";

export const CommentList = () => {
    const { comments, GetAllCommentsByPostId } = useContext(CommentContext);

    const postId = useParams();

    useEffect(() => {
        GetAllCommentsByPostId(postId.id);
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