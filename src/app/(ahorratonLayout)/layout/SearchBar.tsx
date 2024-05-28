'use client';

import {  IconButton, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({
  set,
  handleSearch
}: {
  set: (e:string) => void,
  handleSearch: () => void;
}) {

  return (
        <div>
                <TextField
                    id="search-bar"
                    className="text"
                    onChange={(e) => set((e.target as HTMLInputElement).value)}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === 'Enter') {
                          handleSearch();
                        }
                      }
                    }
                    variant="outlined"
                    placeholder="Coca cola, leche, etc."
                    size="small"
                    spellCheck={false}
            />

            <IconButton type="submit" aria-label="search" onClick={handleSearch}>
                <SearchIcon style={{ fill: "blue" }} />
            </IconButton>
        </div>
  );
}