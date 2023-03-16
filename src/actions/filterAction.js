import filterResultsFetched from "../http/filterResults"
import { FILTEREDHOTELS } from "../actions_types";


const filterAction = (dest_id,dest_type,checkIn,checkOut, adults, children, rooms) => async (dispatch) =>{
    let data = await filterResultsFetched(dest_id,dest_type,checkIn,checkOut, adults, children, rooms);
    dispatch({type : FILTEREDHOTELS, payload : data})
}
export default filterAction;