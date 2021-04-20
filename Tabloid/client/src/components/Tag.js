import React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';

export const Tag = ({ tag }) => {
    return (
        <ListGroup>
            <ListGroupItem>
                {tag.name}
            </ListGroupItem>
        </ListGroup>
    );
};
export default Tag;