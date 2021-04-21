import React, { useEffect, useContext, useState } from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { useParams } from "react-router-dom";


export const PostDetails = () => {
    const [post, setPost] = useState({ userProfile: {} });
    const { getPost } = useContext(PostContext);
    const { id } = useParams();

    useEffect(() => {
        getPost(id).then(setPost);
    }, []);


    return (
        <div>
            <Card className="m-4">
                <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>
                <CardImg top src={post.imageLocation} alt={post.title} />
                <CardBody>
                    <p>
                        <strong>{post.title}</strong>
                    </p>
                    <p>{post.content}</p>
                    <p>{new Date(post.publishDateTime).toLocaleDateString()}</p>
                </CardBody>
            </Card>
        </div>
    );
};

export default PostDetails;