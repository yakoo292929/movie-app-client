/**
 * ===========================================================================================
 * SYSTEM NAME    : movie-app
 * PROGRAM ID     : client/src/components/SearchBar.jsx
 * PROGRAM NAME   : SearchBar.jsx
 *                : コンポーネント：検索バー
 * DEVELOPED BY   : yamabake
 * CREATE DATE    : 2024/06/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import Button from './Button';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';

const SearchBar = () => {

  /////////////////////////////////////////////
  // 検索機能
  /////////////////////////////////////////////
  const [query, setQuery] = useState('');
  const router = useRouter();

  // 検索バーの値取得
  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  // 検索結果画面へ
  const searchQuery = (e) => {
    // リロード防止
    e.preventDefault();

    // 未入力チェック
    if (!query.trim()) {
        return;
    }
    router.push(`search?query=${encodeURIComponent(query)}`);

  }


  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (
    <Box component={"form"} onSubmit={searchQuery}
      sx={{
        width: "80%",
        margin: "3% auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextField onChange={handleChange} fullWidth variant="filled" placeholder="検索する" sx={{ mr: 2, boxShadow: "0, 4px, 6px, rgba(0, 0, 0, 0.1)" }}/>
      <Button type="submit">
        <SearchIcon />
      </Button>
    </Box>
  )


}

export default SearchBar;
