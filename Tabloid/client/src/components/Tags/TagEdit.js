import React, { useContext, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import "./Tags.css";

export const TagEdit = ({ tag }) => {

    const history = useHistory();

    return (
        <>
            <h2>Delete {tag.Name} Tag?</h2>
        </>
    )
}
export default TagEdit;