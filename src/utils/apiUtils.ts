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


export const fetchRecipe = async (recipeId: number, dispatch: Dispatch) => {
    try {
        const response = await axios.get('/api/recipe/getRecipe', {
            params: { recipe_id: recipeId }
        });

        const title = response.data.data.title;
        
        const image = response.data.data.image;
        const description = response.data.data.description;
        
        const productList = response.data.data.product_list;


        if (Array.isArray(productList)) {
            dispatch(setLists(productList));
        } else {
            console.error('Fetched grocery lists is not an array:', productList);
        }


    } catch (error) {
        console.error('Error fetching recipe:', error);
    }
}