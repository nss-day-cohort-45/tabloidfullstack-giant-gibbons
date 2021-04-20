import React, { useState, useContext } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const [tags, setTags] = useState([]);

    const getTags = () => {
        return fetch("/api/tag")
            .then((res) => res.json())
            .then(setTags);
    }

    return (
        <TagContext.Provider value={{ tags, getTags }}>
            {props.children}
        </TagContext.Provider>
    );
};
export default TagProvider;