import React from 'react'
import { useSelector } from 'react-redux';
import Footer from './Footer';
import Header from './Header'
import Results from './Results'
import Searchlocations from './Searchlocations'


const Home = () => {
    let ref = React.useRef(null);
    const filterRes = useSelector((state) => state.hotels_searching.filterRes)?.result;

    React.useEffect(() => {
        if (filterRes?.length > 0) {
            ref?.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [filterRes])

    return (
        <div className='home'>
            <Header />
            <Searchlocations />
            <div ref={ref} className='suggestionResults'>
                <Results />
            </div>
            {filterRes?.length > 0 && <Footer />}
        </div>
    )
}

export default Home