'use client';
import React from "react";
import { useState } from "react";
import { IconButton, TextField, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({
  starting_query,
  set,
}: {
  starting_query: string | null;
  set: (e:string | null) => void,
}) {

  const [search, setSearch] = useState<string | null>(starting_query);

  const handleSearch = () => {
    set(search);
    window.location.href = `/buscar?query=${search}`;
  }
  
  return (
        <Box width='100%'>
          <Box display='flex' flexDirection='row' alignItems='center'>
            <TextField
                id="search-bar"
                className="text"
                value={search}
                onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (event.key === 'Enter') {
                      handleSearch();
                    }
                  }
                }
                variant="outlined"
                placeholder="Coca cola, leche, etc."
                spellCheck={false}
                size='small'
                color='secondary'
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton type="submit" aria-label="search" onClick={handleSearch}>
                      <SearchIcon style={{ fill: "black" }} />
                    </IconButton>
                  ),
                }}
            />
          </Box>
        </Box>
  );
};
