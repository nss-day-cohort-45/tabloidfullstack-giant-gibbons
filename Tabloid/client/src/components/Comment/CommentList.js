import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider"

export const CommentList = () => {
    const { comments, GetAllCommentsByPostId } = useContext(CommentContext);
    const { posts, getAllPosts } = useContext(PostContext)

    console.log("Are comments an array of comments?", comments)
    const postId = useParams();

    useEffect(() => {
        getAllPosts()
            .then(GetAllCommentsByPostId(postId));
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {comments.map((comment) => {
                        const post = posts.find(post => post.id === comment.postId)
                        return <Comment key={comment.id} comment={comment} post={post} />;
                    })}
                </div>
            </div>
        </div>
    );
};
export default CommentList;