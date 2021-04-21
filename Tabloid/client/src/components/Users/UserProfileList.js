import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import UserProfile from "./UserProfile";

export const UserProfileList = () => {
    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext);
    useEffect(() => {
        getAllUserProfiles();
    }, []);

    // useEffect dependency array with dependencies - will run if dependency changes (state)
    // searchTerms will cause a change

    // useEffect(() => {
    //     if (searchTerms !== "") {
    //         searchPosts(searchTerms)
    //     } else {
    //         getPostsWithComments()
    //     }
    // }, [searchTerms])


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {userProfiles.map((userProfile) => {

                        return <UserProfile key={userProfile.id} userProfile={userProfile} />
                    })}
                </div>
            </div>
        </div>
    );
};
export default UserProfileList;