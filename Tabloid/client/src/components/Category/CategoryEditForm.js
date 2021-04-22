import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap'

export const CategoryEditForm = () => {

    const { getCategoryById, editCategory } = useContext(CategoryContext)
    const history = useHistory();
    const { categoryId } = useParams()
    const catId = parseInt(categoryId)

    const [category, setCategory] = useState({
        "name": "",
        "isDeleted": false,
        "id": catId
    })

    useEffect(() => {
        console.log("looking for the catId here:", catId)
        getCategoryById(catId)
            .then(category => {
                setCategory(category)
            })
    }, [])

    const handleClickSaveCat = (event) => {
        event.preventDefault()

        editCategory({
            Name: category.name,
            isDeleted: category.isDeleted,
            id: catId
        })
            .then(() => history.push(`/category`))
    }

    const handleInputChange = (event) => {
        event.preventDefault()

    }

    return (
        <Form className="addCatDiv" onSubmit={handleClickSaveCat}>
            <Label for="catInput">New Category Name</Label>
            <Input id="catInput"
                placeholder="Enter Category Name"
                type="text"
                onChange={handleInputChange}></Input>
            <Button className="a">Save</Button>
        </Form>

    )
}

export default CategoryEditForm;