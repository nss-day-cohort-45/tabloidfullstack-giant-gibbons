import React, { useContext, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider"
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import './category.css'

export const DeleteCategory = () => {

    const { deleteCategory } = useContext(CategoryContext)
    const categoryId = useParams()
    const catId = parseInt(categoryId.categoryId)
    const history = useHistory()

    const handleDeleteClick = () => {
        console.log(catId)
        deleteCategory(catId)
            .then(() => {
                history.push(`/category`)
            })
    }

    return (

        <Form>
            <h3>Are you sure you want to delete this category?</h3>

            <Button className="b" onClick={handleDeleteClick}>Yes, Final Answer</Button>
            <Button className="b"><Link className="a" to={`/category`}>Nevermind, my bad</Link></Button>
        </Form>

    )
}

export default DeleteCategory;