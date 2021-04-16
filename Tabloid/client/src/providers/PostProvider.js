import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({});
    const [searchTerms, setSearchTerms] = useState("");

    const getAllPosts = () => {
        //the proxy that was set up in package.json will be handling the first part of the URL
        return fetch("/api/post")
            .then((res) => res.json())
            .then(setPosts);
    };

    const getPostsWithComments = () => {
        return fetch("/api/post/GetWithComments")
            .then((res) => res.json())
            .then(setPosts);
    };

    const getPost = (id) => {
        return fetch(`/api/post/${id}`)
            .then((res) => res.json())

    };

    const addPost = (post) => {
        return fetch("/api/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        });
    };

    const searchPosts = (searchTerms) => {
        return fetch(`/api/post/search?q=${searchTerms}`)
            .then((res) => res.json())
            .then(setPosts);
    };



    return (
        <PostContext.Provider value={{ posts, getAllPosts, post, getPost, addPost, searchPosts, setSearchTerms, searchTerms, getPostsWithComments, getPost }}>
            {props.children}
        </PostContext.Provider>
    );
};
export default PostProvider;