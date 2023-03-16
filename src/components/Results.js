import React from 'react'
import { useSelector } from 'react-redux';
import Pagination from './Pagination';

const Results = () => {
    const filterRes = useSelector((state) => state.hotels_searching.filterRes)?.result;
    console.log(filterRes)
    return (
        <Pagination>
            {
                filterRes?.length > 0 && filterRes.map((res) => (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-10 mt-3">
                                <div className="card">
                                    <div className="card-horizontal">
                                        <div className="img-square-wrapper">
                                            <img
                                                className="cardImg"
                                                // src="http://via.placeholder.com/300x180"
                                                src={res.max_photo_url}
                                                // src={res.max_1440_photo_url}
                                                alt=""
                                            />
                                        </div>
                                        <div className="card-body">
                                            <div className='title'>
                                                <h4 className="card-title">{res.hotel_name}</h4>
                                                <div className='review'>
                                                    <h3>
                                                        {res.review_score}
                                                    </h3>
                                                    <p>
                                                        {res.review_score_word}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="card-text">
                                                <strong>
                                                    {res.district} {res.city_trans}
                                                </strong>
                                                <small style={{ marginLeft: '10px' }}>
                                                    {res.distance_to_cc} Km from centre
                                                </small>
                                            </p>
                                            <p>
                                                <strong>
                                                    {res.accommodation_type_name}
                                                </strong>
                                                <details>
                                                    <small>
                                                        {
                                                            res.unit_configuration_label
                                                        }
                                                    </small>
                                                </details>
                                            </p>
                                        </div>
                                    </div>
                                    <a href={res.url} target="_blank" rel="noreferrer" className="card-footer">
                                            <strong className="text-muted">Check On Book.com</strong>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </Pagination>
    )
}

export default Results