import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

export const UserProfile = ({ userProfile }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2">{userProfile.fullName}</p>
            <CardBody>
                <p>
                    <Link to={`/userProfiles/${userProfile.id}`}>
                        <strong>{userProfile.displayName}</strong>
                    </Link>
                </p>
                <p>{userProfile.userType.name}</p>
                <Button className="b"><Link className="a" to={`/userProfile/deactivate/${userProfile.id}`}>Deactivate</Link></Button>
            </CardBody>
        </Card>
    );
};

export default UserProfile;