"use client";
import React from "react";
import { useState, useEffect } from "react";
import { IconButton, TextField, Box } from "@mui/material";
import Switch from "@mui/material/Switch";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({
  starting_query,
  set,
  compareSearch,
  setCompareSearch,
}: {
  starting_query: string;
  set: (e: string) => void;
  compareSearch: boolean;
  setCompareSearch: (e: boolean) => void;
}) {
  const [search, setSearch] = useState<string>(starting_query);

  const handleSearch = () => {
    set(search);
    if (compareSearch) {
      window.location.href = `/comparar?query=${search}`;
      return;
    }
    window.location.href = `/buscar?query=${search}`;
  };
  useEffect(() => {
    setCompareSearch(true);
  }, [setCompareSearch]);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <Box width="100%">
      <Box display="flex" flexDirection="row" alignItems="center">
        <TextField
          id="search-bar"
          className="text"
          value={search}
          onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          variant="outlined"
          placeholder="Buscar un producto..."
          spellCheck={false}
          size="small"
          color="secondary"
          fullWidth
          InputProps={{
            endAdornment: (
              <Box display="flex" flexDirection="row">
                <IconButton
                  type="submit"
                  aria-label="search"
                  onClick={handleSearch}
                >
                  <SearchIcon style={{ fill: "black" }} />
                </IconButton>
                {/* <Switch
                        {...label}
                        checked={compareSearch}
                        onChange={
                          (e) => {
                            setCompareSearch(e.target.checked);
                          }
                        } /> */}
              </Box>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
