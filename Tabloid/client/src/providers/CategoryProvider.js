import React, { useState } from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState();

    const getAllCategories = () => {
        //the proxy that was set up in package.json will be handling the first part of the URL
        return fetch("/api/category")
            .then((res) => res.json())
            .then(setCategories);
    };

    return (
        <CategoryContext.Provider value={{ categories, getAllCategories, setCategories }}>
            {props.children}
        </CategoryContext.Provider>
    );
};
export default CategoryProvider;