import axios from "axios";
// checkIn, checkOut,
const filterResultsFetched = async (dest_id, dest_type,checkIn,checkOut, adults, children, rooms) => {
    const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
        params: {
            // adults_number: '2',
            adults_number: adults,
            dest_type: dest_type,
            filter_by_currency: 'AED',
            // checkout_date: '2023-09-06',
            checkout_date: checkOut,
            // checkin_date: '2023-09-05',
            checkin_date: checkIn,
            order_by: 'popularity',
            locale: 'en-gb',
            dest_id: dest_id,
            units: 'metric',
            room_number: rooms,
            categories_filter_ids: 'class::2,class::4,free_cancellation::1',
            children_number : '2',
            children_ages: '5,0',
            page_number: '0',
            include_adjacency: 'true'
        },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_FILTER_RESULTS,
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    };
}
export default filterResultsFetched;
