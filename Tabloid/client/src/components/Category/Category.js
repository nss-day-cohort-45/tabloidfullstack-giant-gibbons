import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import edit from "../../images/edit.png"
import './category.css'
import { Link } from 'react-router-dom'

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
                    <Button className="b"><Link className="a" to={`/category/delete/`}>Edit</Link></Button>
                    <Button className="b">Delete</Button>
                </CardBody>
            </Card>
        </>
    );
};

export default Category;