import { SEARCHHOTELS } from "../actions_types";
import searchHotels from "../http/searchHotels";


const searchAction = (searchWord)=> async(dispatch) =>{
    let res  = await searchHotels(searchWord);
    console.log(res)
    dispatch({type : SEARCHHOTELS, payload : res});
}

export default searchAction