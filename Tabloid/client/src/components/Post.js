import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";

export const Post = ({ post }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>
            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>
                <p>
                    <strong>{post.title}</strong>
                </p>
                <p>{post.content}</p>
            </CardBody>
        </Card>
    );
};

export default Post;