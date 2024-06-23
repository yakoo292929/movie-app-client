/**
 * ===========================================================================================
 * SYSTEM NAME    : movie-app
 * PROGRAM ID     : client/src/components/Layout/Sidebar
 * PROGRAM NAME   : Sidebar.jsx
 *                : コンポーネント：サイドバー
 * DEVELOPED BY   : yamabake
 * CREATE DATE    : 2024/06/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import React from 'react';

const Sidebar = ({ setCategory }) => {

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (
    <>
      <Typography
        sx={{
          bgcolor: "blue",
          color: "white",
          padding: 1,
        }}
      >
        カテゴリ
      </Typography>

      <List component={"nav"}>
        <ListItemButton onClick={() => setCategory('all')}>
          <ListItemText primary="全て"></ListItemText>
        </ListItemButton>

        <ListItemButton onClick={() => setCategory('movie')}>
          <ListItemText primary="映画"></ListItemText>
        </ListItemButton>

        <ListItemButton onClick={() => setCategory('tv')}>
          <ListItemText primary="TV"></ListItemText>
        </ListItemButton>

      </List>
    </>

  )
}

export default Sidebar;
