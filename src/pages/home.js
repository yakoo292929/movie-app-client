/**
 * ===========================================================================================
 * SYSTEM NAME    : movie-app
 * PROGRAM ID     : client/src/pages/home.js
 * PROGRAM NAME   : home.js
 *                : 画面：ホーム画面
 * DEVELOPED BY   : yamabake
 * CREATE DATE    : 2024/06/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import AppLayout from '@/components/Layouts/AppLayout';
import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Button, CardActionArea, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

const home = () => {

  /////////////////////////////////////////////
  // API呼出
  /////////////////////////////////////////////
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        //  サーバー用ファイルをAPI通信で呼び出し
        const response = await axios.get('api/getPopularMovies');
        setMovies(response.data.results);

      } catch(err) {
        console.log(err);

      }
    }

    fetchMovies();

  }, []);

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <AppLayout

      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Home
        </h2>
      }>

      <Head>
        <title>Movie-App</title>
      </Head>

      <SearchBar />


      <Swiper
        spaceBetween={30}
        slidesPerView={5}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          // 320px以上の画面サイズの場合
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // 480px以上の画面サイズの場合
          480: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          // 640px以上の画面サイズの場合
          640: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          // 768px以上の画面サイズの場合
          768: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
        }}
      >

        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link href={`detail/movie/${movie.id}`}>
              <CardActionArea>
                <CardMedia
                  component={"img"}
                  sx={{
                    aspectRatio: "2/3",
                  }}
                  image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                />
              </CardActionArea>
            </Link>

            <Typography>
              公開日：{movie.release_date}
            </Typography>

          </SwiperSlide>
        ))}

      </Swiper>


    </AppLayout>
  )
}

export default home;
