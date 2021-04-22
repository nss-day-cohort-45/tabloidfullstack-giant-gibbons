import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap'

export const CategoryEditForm = () => {

    const { getCategoryById, editCategory } = useContext(CategoryContext)
    const history = useHistory();
    const { categoryId } = useParams()
    const catId = parseInt(categoryId)

    console.log("This is the catId:", catId)
    console.log("This is the categoryId", categoryId)

    const [category, setCategory] = useState({
        "name": "",
        "isDeleted": false,
        "id": catId
    })

    useEffect(() => {

        getCategoryById(catId)
            .then(category => {
                setCategory(category)
            })
    }, [])

    const handleClickSaveCat = () => {
        debugger
        if (catId) {
            editCategory(
                {
                    name: category.name,
                    isDeleted: false,
                    id: catId
                }
            ).then(() => history.push(`/category`))
        }
    }

    const handleInputChange = (event) => {

        const newCat = { ...category }
        let selectedVal = event.target.value
        if (event.target.id.includes("id")) {
            selectedVal = parseInt(selectedVal)
        }
        newCat[event.target.id] = selectedVal
        setCategory(newCat)
    }

    return (
        <Form className="addCatDiv">
            <Label htmlFor="catInput">New Category Name</Label>
            <Input id="name"
                placeholder="Enter Category Name"
                type="text"
                //value=""
                onChange={handleInputChange}></Input>
            <Button className="a" onClick={handleClickSaveCat}>Save</Button>
        </Form>

    )
}

export default CategoryEditForm;