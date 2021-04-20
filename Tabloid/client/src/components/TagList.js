import React, { useContext, useEffect } from "react";
import { TagContext } from "../providers/TagProvider";
import Tag from "./Tag";

export const TagList = () => {
    const { tags, getTags } = useContext(TagContext);

    useEffect(() => {

        getTags();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards=column">
                    {tags.map((tag) => {

                        return <Tag key={tag.id} tag={tag} />
                    })}
                </div>
            </div>
        </div>
    );
};
export default TagList;