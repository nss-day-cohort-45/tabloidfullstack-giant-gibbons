import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { PostContext } from "../../providers/PostProvider";
import Comment from "./Comment";
import { useHistory, useParams } from "react-router-dom";

export const CommentList = () => {
    const { comments, GetAllCommentsByPostId } = useContext(CommentContext);

    const postId = useParams();
    console.log("p", postId);
    useEffect(() => {
        GetAllCommentsByPostId(postId);
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