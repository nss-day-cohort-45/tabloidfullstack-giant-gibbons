import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider"

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const getAllCategories = () => {
        //the proxy that was set up in package.json will be handling the first part of the URL
        return getToken().then((token) =>
            fetch("/api/category", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json()))
            .then(setCategories)
    };

    const getCategoryById = (categoryId) => {
        return fetch(`/api/category/${categoryId}`)
            .then(res => res.json())
    }

    const addCategory = (category) => {
        return fetch("/api/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        });
    };

    const deleteCategory = (categoryId) => {
        return fetch(`/api/category/${categoryId}`, {
            method: "DELETE"
        })
            .then(getAllCategories)
    }

    const editCategory = (category) => {
        return fetch(`/api/category/${category.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
            // .then(response => response.json())
            .then(getAllCategories)
    }


    return (
        <CategoryContext.Provider value={{ categories, getAllCategories, setCategories, addCategory, deleteCategory, editCategory, getCategoryById }}>
            {props.children}
        </CategoryContext.Provider>
    );
};
export default CategoryProvider;