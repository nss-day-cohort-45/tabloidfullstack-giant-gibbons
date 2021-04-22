import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link, useHistory, useParams } from "react-router-dom";

const history = useHistory();
const { postId } = useParams();
const user = JSON.parse(sessionStorage.getItem("userProfile"));

console.log("user", user.id)



export const Post = ({ post }) => {

    const buttonForUser = () => {
        return (
            <Button onClick={() => { history.push(`/post/edit/${postId}`) }}>Edit</Button>
        )
    }

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