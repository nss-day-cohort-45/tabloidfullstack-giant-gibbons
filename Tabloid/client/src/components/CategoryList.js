import React, { useContext, useEffect } from 'react';
import { CategoryContext } from '../providers/CategoryProvider';
import { Category } from './Category';
import { Link } from 'react-router-dom';

export const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleClick = (event) => {

    }

    return (
        <>
            <h2>Categories</h2>
            <div className="createNewBtnDiv">
                <button className="createNewCatBtn">
                    <Link className="a" to={`/reviews/create/`}>Create Category</Link>
                </button>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards=column">
                        {categories.map((category) => (
                            <Category key={category.id} category={category} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryList;