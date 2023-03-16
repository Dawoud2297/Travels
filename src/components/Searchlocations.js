import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import searchAction from '../actions/searchHotels-actionCreator';
import dateFormat from '../helpers/dateFormat';
import filterAction from '../actions/filterAction';
import selectedFromSearch from '../actions/selectedFromSearch';

const Searchlocations = () => {
  const [searchWord, setSearchWord] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [dest, setDest] = useState({ dest_id: '', dest_type: '' });
  const searchSuggestions = useSelector((state) => state.hotels_searching.hotelsResult);
  const [dateRange, setDateRange] = useState([null, null]);
  const [options, setOptions] = useState({ adults: 1, children: 0, rooms: 1 })
  const [checkIn, checkOut] = dateRange;


  dateRange[0] && dateRange[1] && console.log({
    searchWord,
    isSelected,
    checkIn: dateFormat(checkIn),
    checkOut: dateFormat(checkOut),
    options
  })

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchWord.length > 1) {
      dispatch(searchAction(searchWord))
    }
  }, [dispatch, searchWord])

  const selectedSuggestion = useSelector((state) => state.hotels_searching.selectedSuggestion);
  const setChanges = e => {
    if (isSelected) {
      setIsSelected(false)
    } else {
      setSearchWord(e.target.value)
    }
  }

  const increment = (e) => {
    let name = e.target.name;
    setOptions(prevVal => {
      return { ...prevVal, [name]: prevVal[name] + 1 }
    })
  }

  const decrement = (e) => {
    const { name } = e.target;
    setOptions((curVal) => {
      if (name === "adults" && curVal[name] === 1) {
        return { ...curVal, [name]: curVal[name] }
      } else if (name === "rooms" && curVal[name] === 1) {
        return { ...curVal, [name]: curVal[name] }
      } else if (name === "children" && curVal[name] === 0) {
        return { ...curVal, [name]: curVal[name] };
      } else {
        return { ...curVal, [name]: curVal[name] - 1 }
      }
    })
  }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  console.log(searchSuggestions)
  console.log(dest)


  console.log('suggestion : ' + selectedSuggestion)

  const selectSuggestion = (name, label, dest_id, dest_type) => {
    dispatch(selectedFromSearch(name, label));
    setIsSelected(true);
    setDest({ ...dest, dest_id: dest_id, dest_type: dest_type })
  }

  const submitForm = e => {
    e.preventDefault();
    dispatch(filterAction(
      dest.dest_id,
      dest.dest_type,
      dateFormat(checkIn),
      dateFormat(checkOut),
      options.adults,
      options.children,
      options.rooms
    ))
  }

  return (
    <div className='searchHotel'>
      <form onSubmit={submitForm} className='searchForm'>
        <div>
          <input
            type="text"
            className='searchSuggestions'
            value={isSelected ? selectedSuggestion : searchWord}
            onChange={e => setChanges(e)}
            placeholder='Search Locations'
          />
        </div>
        <div className='date'>
          <DatePicker
            className='datePicker'
            selectsRange={true}
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            onChange={(update) => {
              setDateRange(update);
            }}
            placeholderText='checkIn - checkOut Dates'
          />
        </div>
        <div className='options'>
          <div className='adultsNum'>
            <strong>Adults</strong>
            <div className='counter'>
              <button type='button' name="adults" onClick={(e) => increment(e)}>+</button>
              <strong>{options.adults}</strong>
              <button type='button' name='adults' onClick={decrement}>-</button>
            </div>
          </div>
          <div className='childrenNum'>
            <strong>Children</strong>
            <div className='counter'>
              <button type='button' name="children" onClick={increment}>+</button>
              <strong>{options.children}</strong>
              <button type='button' name='children' onClick={decrement}>-</button>
            </div>
          </div>
          <div className='roomNum'>
            <strong>Rooms</strong>
            <div className='counter'>
              <button type='button' name="rooms" onClick={increment}>+</button>
              <strong>{options.rooms}</strong>
              <button type='button' name='rooms' onClick={decrement}>-</button>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary searchButton">Search</button>
      </form>
      <div className='suggestionsResults'>
        {
          !isSelected && searchSuggestions?.map((d) => (
            <div key={d.dest_id} onClick={() => selectSuggestion(d.name, d.label, d.dest_id, d.dest_type)}>
              <ul className="list-group">
                <li className="list-group-item list-group-item-action">
                  <strong>
                    {d.name}
                  </strong>
                  <br></br>
                  <strong>
                    {d.label}
                  </strong>
                </li>
              </ul>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Searchlocations