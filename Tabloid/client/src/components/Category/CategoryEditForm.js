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
        getCategoryById(catId)
            .then(category => {
                setCategory(category)
            })
    }, [])

    const handleClickSaveCat = () => {
        if (catId) {
            editCategory(
                {
                    name: category.name,
                    isDeleted: category.isDeleted,
                    id: catId
                }
            ).then(() => history.push(`/category`))
        }
    }

    const handleInputChange = (event) => {

        const newCat = { ...category }
        let selectedVal = event.target.value
        // if (event.target.id.includes("id")) {
        //     selectedVal = parseInt(selectedVal)
        // }
        newCat[event.target.id] = selectedVal
        setCategory(newCat)
    }

    return (
        <Form className="addCatDiv" onSubmit={handleClickSaveCat}>
            <Label htmlFor="catInput">New Category Name</Label>
            <Input id="catInput"
                placeholder="Enter Category Name"
                type="text"
                // value="default"
                onChange={handleInputChange}></Input>
            <Button className="a" >Save</Button>
        </Form>

    )
}

export default CategoryEditForm;