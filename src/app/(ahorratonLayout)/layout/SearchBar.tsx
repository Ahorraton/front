'use client';


import {  IconButton, TextField } from "@mui/material";
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import { fetch_async } from '../async/commun/fetch_async'
import { BASE_TEST_URL } from '../async/commun/urls'

export default function SearchUsers({
  set,
}: {
  disabled?: boolean;
  set: any;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  async function handleSearch(term: string) {
    console.log("Dentro del handler")
    console.log(term)

    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    console.log()

    let url = '';

    const product_searched = params.toString().split('=')[1];

    const limit = 1000;
    const offset = 0;

    if (product_searched) {
      url = BASE_TEST_URL + product_searched;
    } else {
      url = `${BASE_TEST_URL}users?limit=${limit}&offset=${offset}`;
    }

    const res: [] = await fetch_async(url, 'product');

    console.log("Estoy acaa")

    //set(res);

    console.log('res', res);

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
        <div>
                <TextField
                    id="search-bar"
                    className="text"
                    onChange={(e) => set((e.target as HTMLInputElement).value)}
                    onSubmit={(e) => handleSearch((e.target as HTMLInputElement).value)}
                    label="Enter product name"
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    spellCheck={false}
            />

            <IconButton type="submit" aria-label="search" onClick={(e) => handleSearch((e.target as HTMLInputElement).value)}>
                <SearchIcon style={{ fill: "blue" }} />
            </IconButton>
        </div>
  );
}