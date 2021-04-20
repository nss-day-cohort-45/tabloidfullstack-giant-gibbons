import React, { useContext, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider"
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

export const CategoryForm = () => {

    const { addCategory } = useContext(CategoryContext)
    const history = useHistory();

    const [category, setCategory] = useState({
        "id": 0,
        "Name": ""
    })

    const handleClickSaveCat = (event) => {
        event.preventDefault()

        addCategory({
            id: category.id,
            name: category.name
        })
            .then(() => history.push(`/category`))
    }

    return (
        <Form className="addCatDiv" onSubmit={handleClickSaveCat}>
            <Label>New Category Name</Label>
            <Input id="catInput" placeholder="Enter Category Name"></Input>
            <Button>Save</Button>
        </Form>

    )

}

export default CategoryForm;