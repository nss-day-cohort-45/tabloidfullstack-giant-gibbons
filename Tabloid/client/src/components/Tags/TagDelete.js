import React, { useContext, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import "./Tags.css";

export const TagDelete = () => {
    const { deleteTag } = useContext(TagContext);
    const tagId = useParams().id;
    const history = useHistory();

    const handleDelete = () => {
        deleteTag(tagId)
            .then(() => {
                history.push('/tag')
            });
    }

    return (
        <>
            <h2>Are you sure you want to delete this tag?</h2>
            <Button className="a" onClick={handleDelete}>Delete</Button>
            <Button className="a" href="/tag/">Go Back</Button>
        </>
    )

}
export default TagDelete;