/**
 * ===========================================================================================
 * SYSTEM NAME    : movie-app
 * PROGRAM ID     : client/src/pages/search.jsx
 * PROGRAM NAME   : search.jsx
 *                : 画面：検索結果画面
 * DEVELOPED BY   : yamabake
 * CREATE DATE    : 2024/06/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import AppLayout from '@/components/Layouts/AppLayout';
import Layout from '@/components/Layouts/Layout';
import MediaCard from '@/components/MediaCard';
import Sidebar from '@/components/Sidebar';
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const search = () => {

  const [category, setCategory] = useState('all');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {query: searchQuery} = router.query;

  useEffect(() => {

    // 初回ロード時のundifiendはAPIを行わない
    if (!searchQuery) {
       return;
    }

    const fetchMedia = async() => {
      try {
        //  サーバー用ファイルをAPI通信で呼び出し
        const response = await axios.get(`api/searchMedia?searchQuery=${searchQuery}`);
        const searchResults = response.data.results;

        // movieとtvのみに絞込
        const validResults =  searchResults.filter((item) => item.media_type === 'movie' || item.media_type === 'tv');
        setResults(validResults);

      } catch(err) {
        console.log(err);

      } finally {
        setLoading(false);
      }

    }

    fetchMedia();

  }, [searchQuery]);

  /////////////////////////////////////////////
  // 検索結果のフィルタリング
  /////////////////////////////////////////////
  const filterdResults = results.filter((result) => {
    if (category === 'all' ) {
        return true;
    }

    return result.media_type === category;
  });

  console.log(filterdResults);


  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (
    <AppLayout

      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          検索結果
        </h2>
      }>

      <Head>
        <title>Movie-App-検索結果</title>
      </Head>

      <Layout sidebar={<Sidebar setCategory={setCategory}/>}>
        {loading ? (
          <Grid item textAlign={"center"} xs={12}>
            <Typography>検索中...</Typography>
          </Grid>
        ) : filterdResults.length > 0 ? (
          <Grid container spacing={3}>
            {filterdResults.map((media) =>(
              <MediaCard item={media} key={media.id} isContent={true} />
            ))}
          </Grid>
        ) : (
          <Grid item textAlign={"center"} xs={12}>
            <Typography>検索結果がみつかりませんでした</Typography>
          </Grid>
        )}

      </Layout>

    </AppLayout>

  )

}

export default search;
