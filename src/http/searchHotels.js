import axios from "axios";

const searchHotels = async (searchWord) => {
  const options = {
    method: 'GET',
    url: 'https://booking-com.p.rapidapi.com/v1/hotels/locations',
    params: { name: searchWord, locale: 'en-gb' },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_BOOKING,
      'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default searchHotels;