import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./Posts.css";

export const Post = ({ post }) => {

  const user = JSON.parse(sessionStorage.getItem("userProfile"));

  const enableButton = user.id === post.userProfileId;

  const buttonForUser = () => {
    return (
      <Button className="b">
        <Link className="a" to={`/post/edit/${post.id}`}>
          Edit
        </Link>
      </Button>
    );
  };

  const deleteForUser = () => {
    return (
      <Button className="b">
        <Link className="a" to={`/post/delete/${post.id}`}>
          Delete
        </Link>
      </Button>
    );
  };

  return (
    <Card className="m-4">
      <p className="text-left px-2">
        Posted by: {post.userProfile.displayName}
      </p>
      <CardImg top src={post.imageLocation} alt={post.title} />
      <CardBody>
        <p>
          <Link to={`/post/${post.id}`}>
            <strong>{post.title}</strong>
          </Link>
        </p>
        <p>{post.category.name}</p>
        <div>{enableButton ? buttonForUser() : null}</div>
        <div>{enableButton ? deleteForUser() : null}</div>

      </CardBody>
    </Card>
  );
};

export default Post;
