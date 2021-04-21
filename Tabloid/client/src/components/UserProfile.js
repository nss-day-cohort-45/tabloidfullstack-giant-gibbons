import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const UserProfile = ({ userProfile }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2">{userProfile.fullName}</p>
            <CardBody>
                <p>
                    <Link to={`/userProfile/${userProfile.id}`}>
                        <strong>{userProfile.displayName}</strong>
                    </Link>
                </p>
                <p>{userProfile.userType.name}</p>
            </CardBody>
        </Card>
    );
};

export default UserProfile;