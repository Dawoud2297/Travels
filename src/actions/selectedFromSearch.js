import { SELECTEDFROMSEARCH } from "../actions_types";

const selectedFromSearch = (selectedName,selectedLabel) => {
    return {type : SELECTEDFROMSEARCH, payload : `${selectedName} ${selectedLabel}`}
}

export default selectedFromSearch;