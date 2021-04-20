import React from "react";
import { Card, CardBody } from "reactstrap";

/* Category is responsible for converting each piece of 
category data into HTML and ultimately displays the name
of each category, using the imported reactstrap Card and 
CardBody.*/

export const Category = ({ category }) => {
    return (
        <>
            <Card className="m-4">
                <CardBody>
                    <p>
                        <strong>{category.name}</strong>
                    </p>
                </CardBody>
            </Card>
        </>
    );
};

export default Category;