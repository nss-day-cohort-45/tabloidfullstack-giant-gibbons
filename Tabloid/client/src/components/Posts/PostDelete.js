import React, { useContext } from "react";
import { PostContext } from "../../providers/PostProvider"
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'reactstrap'


export const DeletePost = () => {

    const { deletePost } = useContext(PostContext)
    const postId = useParams().id;
    const history = useHistory();

    const handleDeleteClick = () => {
        deletePost(postId)
            .then(() => {
                history.push(`/post`)
            });
    }

    return (
        <>
            <h3>Are you sure you want to delete this post?</h3>

            <Button className="b" onClick={handleDeleteClick}>Yes, Final Answer</Button>
            <Button className="b" href="/post/">Nevermind, my bad</Button>
        </>
    )
}
export default DeletePost;