import React, { useContext, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import "./Tags.css";


export const TagForm = () => {
    const { addTag } = useContext(TagContext);

    const [tag, setTags] = useState({
        name: ""
    });

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newTag = { ...tag };
        let selectedVal = event.target.value;
        newTag[event.target.id] = selectedVal
        setTags(newTag);
    }

    const handleClickSaveLongRun = (event) => {
        event.preventDefault();

        const name = tag.name;
        if (name === "") {
            window.alert("Please provide a title for the tag you are trying to create.");
        } else {
            addTag(tag)
                .then(() => history.push("/tags"));
        }
    }

    return (
        <>
            <div>
                {/* Add the tag form JSX here */}
            </div>
        </>
    )
}
export default TagForm;