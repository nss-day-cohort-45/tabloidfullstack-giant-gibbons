import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import Comment from "./Comment";
import { useParams } from "react-router-dom";

export const CommentList = () => {

    const { comments, GetAllCommentsByPostId } = useContext(CommentContext);
    const { id } = useParams();

    useEffect(() => {
        GetAllCommentsByPostId(id);
    }, []);

    console.log("This is a commentS:", comments)

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {comments.map((comment) => {
                        console.log("This is a comment:", comment)
                        return <Comment key={comment.id} comment={comment} />;
                    })}
                </div>
            </div>
        </div>
    );
};
export default CommentList;