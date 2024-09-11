import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { selectList } from '../../redux/store/multipleListsSlice';
import { setList, setListName } from '../../redux/store/listSlice';
import axios from 'axios';

type ListSelectorProps = {
    isListSaved: boolean;
    setPendingListId: (id: number | null) => void;
    setOpenDialog: (open: boolean) => void;
};

const ListSelector: React.FC<ListSelectorProps> = ({ isListSaved, setPendingListId, setOpenDialog }) => {
    const multipleLists = useSelector((state: RootState) => state.multipleLists);
    const dispatch = useDispatch();

    const handleListChange = async (event: SelectChangeEvent<number>) => {
        const selectedListId = Number(event.target.value);

        if (!isListSaved) {
            setPendingListId(selectedListId);
            setOpenDialog(true);
        } else {
            try {
                const response = await axios.get(`/api/list/getList`, {
                    params: { grocery_list_id: selectedListId }
                });
                console.log('Fetched list:', response.data.items);
                const selectedList = multipleLists.lists.find(list => list.id === selectedListId);
                if (selectedList) {
                    dispatch(setListName(selectedList.name));
                }
                dispatch(selectList(selectedListId));
                dispatch(setList(response.data.items));
            } catch (error) {
                console.error('Error fetching list:', error);
            }
        }
    };

    return (
        <Select
            value={multipleLists.selectedListId || ''}
            onChange={handleListChange}
            displayEmpty
            fullWidth
        >
            {Array.isArray(multipleLists.lists) && multipleLists.lists.length > 0 ? (
                multipleLists.lists.map(list => (
                    <MenuItem key={list.id} value={list.id}>
                        {list.name}
                    </MenuItem>
                ))
            ) : (
                <MenuItem disabled value="">
                    Todavía no tienes listas guardadas
                </MenuItem>
            )}
        </Select>
    );
};

export default ListSelector;
