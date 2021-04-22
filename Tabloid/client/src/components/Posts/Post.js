import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";

export const Post = ({ post }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>
            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>
                <p>
                    <Link to={`/post/${post.id}`}>
                        <strong>{post.title}</strong>
                    </Link>
                </p>
                <p>{post.category.name}</p>
            </CardBody>

        </Card>
    );
};

export default Post;