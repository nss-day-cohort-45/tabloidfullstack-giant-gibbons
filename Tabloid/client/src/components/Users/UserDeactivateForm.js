import React, { useContext, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import '../Category/category.css'

export const DeactivateUserProfile = () => {

    const { deactivateUserProfile } = useContext(UserProfileContext)
    const userProfileId = useParams()
    const profileId = parseInt(userProfileId.userProfileId)
    const history = useHistory()

    const handleDeactivateClick = () => {
        deactivateUserProfile(profileId)
            .then(() => {
                history.push(`/userProfiles`)
            })
    }

    return (

        <Form>
            <h3>Are you sure you want to deactivate this user?</h3>

            <Button className="b" onClick={handleDeactivateClick}>Yes, Final Answer</Button>
            <Button className="b"><Link className="a" to={`/userProfiles`}>Nevermind, my bad</Link></Button>
        </Form>

    )
}

export default DeactivateUserProfile;