import React from "react";
import { Card, CardBody } from "reactstrap";

export const Category = ({ category }) => {
    return (
        <Card className="m-4">
            <CardBody>
                <p>
                    <strong>{category.Name}</strong>
                </p>
            </CardBody>
        </Card>
    );
};

export default Post;