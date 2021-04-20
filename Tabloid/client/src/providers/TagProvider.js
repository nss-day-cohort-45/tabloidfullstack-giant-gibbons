import React, { useState, useContext } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const [tags, setTags] = useState([]);

    const getTags = () => {
        return fetch("/api/tag")
            .then((res) => res.json())
            .then(setTags);
    }

    const addTag = (tag) => {
        return fetch("/api/tag", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        })
            .then(getTags);
    }

    return (
        <TagContext.Provider value={{ tags, getTags, addTag }}>
            {props.children}
        </TagContext.Provider>
    );
};
export default TagProvider;