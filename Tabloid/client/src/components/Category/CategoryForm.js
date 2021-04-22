import React, { useContext, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider"
import { useHistory } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap'

export const CategoryForm = () => {

    const { addCategory } = useContext(CategoryContext)
    const history = useHistory();

    const [category, setCategory] = useState({
        "name": ""
    })

    const handleClickSaveCat = (event) => {
        event.preventDefault()

        addCategory({
            Name: category
        })
            .then(() => history.push(`/category`))
    }

    return (
        <Form className="addCatDiv" onSubmit={handleClickSaveCat}>
            <Label for="catInput">New Category Name</Label>
            <Input id="catInput"
                placeholder="Enter Category Name"
                type="text"
                onChange={e => setCategory(e.target.value)}></Input>
            <Button className="a">Save</Button>
        </Form>

    )

}

export default CategoryForm;