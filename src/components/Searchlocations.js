import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import searchAction from '../actions/searchHotels-actionCreator';
import dateFormat from '../helpers/dateFormat';
import filterAction from '../actions/filterAction';
import selectedFromSearch from '../actions/selectedFromSearch';

const Searchlocations = (props) => {
  const {
    searchWord,
    setSearchWord,
    dest,
    setDest,
    setDateRange,
    options,
    setOptions,
    checkIn,
    checkOut,
    currentPage = 0,
    setCurrentPage
  } = props;

  const [isSelected, setIsSelected] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const searchSuggestions = useSelector((state) => state.hotels_searching.hotelsResult);
  const [openOptions, setOpenOptions] = useState(false)


  const dispatch = useDispatch();

  useEffect(() => {
    if (searchWord.length > 1) {
      dispatch(searchAction(searchWord))
    };
    if (!searchWord) {
      setIsEmpty(true)
      setSearchWord('');
    }
  }, [dispatch, searchWord, setSearchWord])

  const selectedSuggestion = useSelector((state) => state.hotels_searching.selectedSuggestion);
  const setChanges = e => {
    if (isSelected) {
      setIsSelected(false);
      setIsEmpty(false)
    } else {
      setSearchWord(e.target.value);
      setIsEmpty(false);
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


  const selectSuggestion = (name, label, dest_id, dest_type) => {
    dispatch(selectedFromSearch(name, label));
    setIsSelected(true);
    setDest({ ...dest, dest_id: dest_id, dest_type: dest_type })
  }

  const onOpenOptions = () => {
    setOpenOptions(true);
    if (openOptions) setOpenOptions(false);
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
      options.rooms,
      currentPage
    ))
    if (currentPage > 1) {
      setCurrentPage(1)
    }
  }

  return (
    <div className='formContainer'>
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
            onChangeRaw={e => e.preventDefault()}
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
        {
          !openOptions ? (
            <button type="button" className="btn optionsButton" onClick={onOpenOptions}>
              {options.adults} Adults , {options.children} Children, {options.rooms} Rooms
            </button>
          ) : (
            <div className='options'>
              <div className='adultsNum category'>
                <h1>Adults</h1>
                <div className='counter'>
                  <button type='button' name="adults" onClick={(e) => increment(e)}>+</button>
                  <h3>{options.adults}</h3>
                  <button type='button' name='adults' onClick={decrement}>-</button>
                </div>
              </div>
              <div className='childrenNum category'>
                <h1>Children</h1>
                <div className='counter'>
                  <button type='button' name="children" onClick={increment}>+</button>
                  <h3>{options.children}</h3>
                  <button type='button' name='children' onClick={decrement}>-</button>
                </div>
              </div>
              <div className='roomNum category'>
                <h1>Rooms</h1>
                <div className='counter'>
                  <button type='button' name="rooms" onClick={increment}>+</button>
                  <h3>{options.rooms}</h3>
                  <button type='button' name='rooms' onClick={decrement}>-</button>
                </div>
              </div>
              <button type='button' className='btn-done' onClick={onOpenOptions}>Done</button>
            </div>
          )
        }
        <button type="submit" className="btn searchButton">Search</button>
      </form>
      <div className='suggestions'>
        {
          !isSelected && !isEmpty && searchSuggestions?.map((d) => (
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