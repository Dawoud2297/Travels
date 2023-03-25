import { useSelector } from 'react-redux';
import trimStr from '../helpers/strTrim';


const Results = () => {

  const filterRes = useSelector((state) => state.hotels_searching.filterRes)?.result;
  console.log(filterRes)


  return (
    <>
      {
        filterRes?.length > 0 && filterRes.map((res) => (
          <div className="card">
            <img
              className="cardImg"
              src={res.max_photo_url}
              alt=""
            />
            <div className="card-body">
              <div className="title">
                <h3 className="head">{res.hotel_name}</h3>
                <p className="sub-head">
                  <strong>
                    {res.district} {res.city_trans}
                  </strong>
                  <small style={{ marginLeft: "10px" }}>
                    {res.distance_to_cc} Km from centre
                  </small>
                </p>
              </div>
              <div className="details">
                <strong>{res.accommodation_type_name}</strong>
                <p>{trimStr(res.unit_configuration_label)}</p>
              </div>
            </div>
            <div className="review">
              {
                !res.review_score ? (
                  <p className='newToHotel'>New To Hotels</p>
                ) : (
                  <>
                    <h3>{res.review_score}</h3>
                    <p>{res.review_score_word}</p>
                  </>
                )
              }
            </div>
            <div className="price">EGP 10,138</div>
            <button>availability</button>
          </div>
        ))
      }
    
    </>
  )
}

export default Results