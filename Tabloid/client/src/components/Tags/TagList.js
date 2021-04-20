import React, { useContext, useEffect } from "react";
import { TagContext } from "../../providers/TagProvider";
import Tag from "./Tag";
import "./Tags.css";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';


export const TagList = () => {
    const { tags, getTags } = useContext(TagContext);

    useEffect(() => {

        getTags();
    }, []);

    return (
        <>
            <h2>Tags</h2>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards=column">
                        {tags.map((tag) => {
                            return <Tag key={tag.id} tag={tag} />
                        })}
                    </div>
                </div>
                <Button>
                    <Link className="a" to={`/tag/create/`}>Create Tag</Link>
                </Button>
            </div>
        </>
    );
};
export default TagList;