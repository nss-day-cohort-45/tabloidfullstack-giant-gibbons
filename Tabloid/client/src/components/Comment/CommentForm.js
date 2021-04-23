import React, { useContext, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider"
import { useHistory } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap'

export const CommentForm = () => {

    const { addComment } = useContext(CommentContext)
    const history = useHistory();

    const [comment, setComment] = useState({
        "subject": "",
        "content": ""
    })

    const handleClickSaveCat = (event) => {
        event.preventDefault()

        addComment({
            subject: comment.subject,
            content: comment.content
        })
            .then(() => history.push(`/comment/${postId}`))
    }

    const handleInputChange = (event) => {

        const newComment = { ...comment }
        let selectedVal = event.target.value
        if (event.target.id.includes("id")) {
            selectedVal = parseInt(selectedVal)
        }
        newComment[event.target.id] = selectedVal
        setComment(newComment)
    }

    return (
        <Form className="addCatDiv" >
            <Label for="subject">New Category Name</Label>
            <Input id="subject"
                placeholder="Enter Comment Subject"
                type="text"
                onChange={handleInputChange}>
            </Input>
            <Input id="content"
                placeholder="Enter Comment Content"
                type="text"
                onChange={handleInputChange}>
            </Input>
            <Button className="a" onClick={handleClickSaveCat}>Save</Button>
        </Form>

    )

}

export default CategoryForm;