import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Comment = ({ comment }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2">
                Posted by: {comment.userProfile.displayName}
            </p>

            <CardBody>
                <p>
                    <Link to={`/comment/${comment.id}`}>
                        <strong>{comment.subject}</strong>
                    </Link>
                </p>
                <p>{comment.content}</p>
            </CardBody>
        </Card>
    );
};

export default Comment;