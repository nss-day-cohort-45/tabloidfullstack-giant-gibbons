import React, { useEffect, useContext, useState } from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useParams, Link } from "react-router-dom";


export const UserProfileDetails = () => {
    const [userProfile, setUserProfile] = useState({ userType: {} });
    const { getUserProfileById } = useContext(UserProfileContext);
    const { id } = useParams();

    useEffect(() => {
        getUserProfileById(id).then(setUserProfile);
        console.log(userProfile)

    }, []);


    return (
        <div>
            <Card className="m-4">
                <p className="text-left px-2">{userProfile.fullName}</p>
                <CardImg top src={userProfile.imageLocation} alt={userProfile.fullName} />
                <CardBody>
                    <p>
                        <strong>{userProfile.displayName}</strong>
                    </p>
                    <p>{userProfile.email}</p>
                    <p>{new Date(userProfile.createDateTime).toLocaleDateString()}</p>
                    <p>{userProfile.userType.name}</p>
                    <Button className="b"><Link className="a" to={`/userProfile/deactivate/${userProfile.id}`}>Deactivate</Link></Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default UserProfileDetails;