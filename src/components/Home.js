import React, { useState } from 'react'
import { useSelector } from 'react-redux';
// import Footer from './Footer';
import Header from './Header'
import Results from './Results'
import Searchlocations from './Searchlocations'
import Pagination from './Pagination';


let PageSize = 20;


const Home = () => {

    /* Form Data*/
    const [searchWord, setSearchWord] = useState('');
    const [dest, setDest] = useState({ dest_id: '', dest_type: '' });
    const [dateRange, setDateRange] = useState([null, null]);
    const [options, setOptions] = useState({ adults: 1, children: 0, rooms: 1 })
    const [checkIn, checkOut] = dateRange;
    /* */
    const [currentPage, setCurrentPage] = useState(1)

    let ref = React.useRef(null);
    const initialRes = useSelector((state) => state.hotels_searching.filterRes);
    const filterRes = useSelector((state) => state.hotels_searching.filterRes)?.result;

    React.useEffect(() => {
        if (filterRes?.length > 0) {
            ref?.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [filterRes])

    return (
        <div className='home'>
            <Header />
            <Searchlocations
                searchWord={searchWord}
                setSearchWord={setSearchWord}
                dest={dest}
                setDest={setDest}
                setDateRange={setDateRange}
                options={options}
                setOptions={setOptions}
                checkIn={checkIn}
                checkOut={checkOut}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <div ref={ref} className='cardContainer'>
                <Results currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={initialRes?.count}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                    /////////////
                    searchWord={searchWord}
                    setSearchWord={setSearchWord}
                    dest={dest}
                    setDest={setDest}
                    setDateRange={setDateRange}
                    options={options}
                    setOptions={setOptions}
                    checkIn={checkIn}
                    checkOut={checkOut}
                />
            </div>
        </div>
    )
}

export default Home