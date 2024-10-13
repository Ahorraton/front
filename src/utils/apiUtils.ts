import axios from 'axios';
import { Dispatch } from 'redux';
import { setLists } from '../redux/store/multipleListsSlice';

export const fetchUserLists = async (userId: number, dispatch: Dispatch) => {
    try {
        const response = await axios.get('/api/list/getAllLists', {
            params: { user_id: userId }
        });
        const groceryLists = response.data.data.grocery_list_ids;
        if (Array.isArray(groceryLists)) {
            dispatch(setLists(groceryLists));
        } else {
            console.error('Fetched grocery lists is not an array:', groceryLists);
        }
    } catch (error) {
        console.error('Error fetching user lists:', error);
    }
};
