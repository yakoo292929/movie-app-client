/**
 * ===========================================================================================
 * SYSTEM NAME    : movie-app
 * PROGRAM ID     : client/src/components/MediaCard.jsx
 * PROGRAM NAME   : MediaCard.jsx
 *                : コンポーネント：メディアカード
 * DEVELOPED BY   : yamabake
 * CREATE DATE    : 2024/06/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const MediaCard = ({ item, isContent }) => {

  const imagePath = item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : "media_poster_img/NO_IMAGE.png"

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardActionArea>
          <Link href={`/detail/${item.media_type}/${item.id}`}>
            <CardMedia
              component={"img"}
              sx={{ aspectRatio: "2/3" }}
              image={imagePath}
            />

            {isContent && (
              <CardContent>
                <Typography variant="h6" component={"div"} noWrap>{item.title || item.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">{item.release_date || item.first_air_date}</Typography>
              </CardContent>
            )}

          </Link>
        </CardActionArea>
      </Card>
    </Grid>

  )
}

export default MediaCard;
