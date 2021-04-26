import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);

  const GetAllCommentsByPostId = (id) => {
    console.log("is there anything here?", id);
    return getToken()
      .then((token) =>
        fetch(`/api/comment/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json())
      )
      .then(setComments);
  };

  return (
    <CommentContext.Provider
      value={{ comment, comments, GetAllCommentsByPostId, setComments }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
