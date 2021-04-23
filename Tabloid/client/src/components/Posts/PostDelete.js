import React, { useContext } from "react";
import { PostContext } from "../../providers/PostProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'reactstrap'

export const PostDelete = () => {

    const { deletePost } = useContext(PostContext)
    const postId = parseInt(useParams().id);
    const history = useHistory();
    console.log("postId", postId)

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
export default PostDelete;