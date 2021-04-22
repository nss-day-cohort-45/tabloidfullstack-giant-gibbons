import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import "./category.css"

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
            <Button className="b" onClick={handleClickSaveCat}>Save</Button>
            <Button className="b"><Link className="a" to="/category" >Cancel</Link></Button>
        </Form>

    )
}

export default CategoryEditForm;