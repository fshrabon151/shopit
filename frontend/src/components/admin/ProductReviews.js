import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/Loader';
import { useAlert } from 'react-alert';
import Sidebar from './Sidebar';
import { getProductReviews, clearErrors } from '../../redux/actions/products';



const ProductReviews = () => {
    const [productId, setProductId] = useState('')
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, reviews } = useSelector((state) => state.productReviews);


    useEffect(() => {
        if (productId !== "") {
            dispatch(getProductReviews(productId))
        }


        //     if (deleteError) {
        //         alert.error(deleteError);
        //         dispatch(clearErrors());
        //     }
        //     if (isDeleted) {
        //         alert.success('review deleted successfully');
        //         navigate('/admin/users');
        //         // dispatch({ type: DELETE_USER_RESET });
        //     }
    }, [alert, dispatch, productId]);
    if (error) {
        alert.error("No review found or invalid product id");
        dispatch(clearErrors());
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc',
                },

                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc',
                },

                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc',
                },

                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc',
                },

                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: [],
        };

        reviews.forEach((review) => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions: (
                    <>

                        <button
                            className="btn btn-danger py-1 px-2 ml-2"
                        // onClick={() => deleteUserHandler(review._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });
        return data;
    };
    // const deleteUserHandler = (id) => {
    //     confirmAlert({
    //         title: 'Confirm to submit',
    //         message: 'Are you sure to do this.',
    //         buttons: [
    //             {
    //                 label: 'Yes',
    //                 onClick: () => dispatch(deleteUser(id)),
    //             },
    //             {
    //                 label: 'No',
    //             },
    //         ],
    //     });
    // };

    return (
        <>
            <MetaData title="Product reviews" />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">Product reviews</h1>

                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label for="productId_field">Enter Product ID</label>
                                        <input
                                            type="text"
                                            id="email_field"
                                            className="form-control"
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn btn-primary btn-block py-2"
                                    >
                                        SEARCH
                                    </button>
                                </form>
                            </div>
                        </div>

                        {reviews && reviews.length > 0 ?
                            <MDBDataTable
                                data={setReviews()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            /> : productId && <p className="mt-5 text-center">No reviews</p>
                        }

                    </>
                </div>
            </div>
        </>
    )
}

export default ProductReviews
