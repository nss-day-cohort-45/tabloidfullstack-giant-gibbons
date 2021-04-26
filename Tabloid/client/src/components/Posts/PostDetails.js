import React, { useEffect, useContext, useState } from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useParams, Link } from "react-router-dom";
import "./Post.css";
import { CommentContext } from "../../providers/CommentProvider";
import { CommentList } from "../Comment/CommentList";

export const PostDetails = () => {
    const [post, setPost] = useState({ userProfile: {} });
    // const [, setComments] = useState([]);
    const { getPost } = useContext(PostContext);
    const { id } = useParams();

    useEffect(() => {
        getPost(id).then(setPost)
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
                <Button className="b"><Link className="a" to={`/comment/create/${post.id}`}>Add Comment</Link></Button>
                <div className="">
                    <CommentList />
                </div>
            </Card>
        </div>
    );
};

export default PostDetails;