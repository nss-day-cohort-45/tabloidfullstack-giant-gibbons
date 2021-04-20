import React, { useContext } from "react";
import { CategoryContext } from "../../providers/CategoryProvider"
import { Link } from 'react-router-dom';

export const CategoryForm = () => {

    const { addCategory } = useContext(CategoryContext)

    return (
        <div className="addCatDiv">
            <label>New Category Name</label>
            <input id="catInput" placeholder="Enter Category Name"></input>
            <button><Link to="/category"></Link></button>
        </div>

    )

}

export default CategoryForm;