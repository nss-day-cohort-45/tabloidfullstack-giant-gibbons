import React, { useContext, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider"
import { Link } from 'react-router-dom';

export const CategoryForm = () => {

    const { addCategory } = useContext(CategoryContext)

    const [category, setCategory] = useState({
        "id": 0,
        "Name": ""
    })



    return (
        <div className="addCatDiv">
            <label>New Category Name</label>
            <input id="catInput" placeholder="Enter Category Name"></input>
            <button><Link to="/category">Save</Link></button>
        </div>

    )

}

export default CategoryForm;