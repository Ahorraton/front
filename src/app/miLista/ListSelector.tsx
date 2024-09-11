import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { selectList } from '../../redux/store/multipleListsSlice';

type ListSelectorProps = {
    isListSaved: boolean;
    setPendingListId: (id: number | null) => void;
    setOpenDialog: (open: boolean) => void;
};

const ListSelector: React.FC<ListSelectorProps> = ({ isListSaved, setPendingListId, setOpenDialog }) => {
    const multipleLists = useSelector((state: RootState) => state.multipleLists);
    const dispatch = useDispatch();

    const handleListChange = (event: SelectChangeEvent<number>) => {
        if (!isListSaved) {
            setPendingListId(Number(event.target.value));
            setOpenDialog(true);
        } else {
            dispatch(selectList(Number(event.target.value)));
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
