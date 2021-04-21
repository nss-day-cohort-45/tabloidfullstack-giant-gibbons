import React from "react";
import { Card, CardBody } from "reactstrap";

export const Tag = ({ tag }) => {
    return (
        <>
            <Card className="m-4">
                <CardBody>
                    <p>
                        <strong>{tag.name}</strong>
                    </p>
                </CardBody>
            </Card>
        </>
    );
};
export default Tag;