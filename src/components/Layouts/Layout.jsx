/**
 * ===========================================================================================
 * SYSTEM NAME    : movie-app
 * PROGRAM ID     : client/src/components/Layout/Layout.jsx
 * PROGRAM NAME   : Layout.jsx
 *                : コンポーネント：基本レイアウト
 * DEVELOPED BY   : yamabake
 * CREATE DATE    : 2024/06/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import SearchBar from '../SearchBar';

const Layout = ({ children, sidebar }) => {

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <Container>

      <SearchBar/>

      <Grid container spacing={3} py={4}>

        <Grid item xs={12} md={3}>
          <Box bgcolor={"white"} boxShadow={1}>
            {sidebar}
          </Box>
        </Grid>

        <Grid item xs={12} md={9}>
          {children}
        </Grid>

      </Grid>

    </Container>

  )
}

export default Layout;
