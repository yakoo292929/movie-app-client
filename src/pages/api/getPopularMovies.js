/**
 * ===========================================================================================
 * SYSTEM NAME    : movie-app
 * PROGRAM ID     : client/src/pages/api/getPopularMovies.js
 * PROGRAM NAME   : getPopularMovies.js
 *                : API：人気映画・TV取得 API
 * DEVELOPED BY   : yamabake
 * CREATE DATE    : 2024/06/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import axios from "axios";

export default async function handler(req, res) {

  try {
    // TMDB API
    const response = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`);
    res.status(200).json(response.data);
    console.log('取得したデータは...', response.data);

  } catch(err) {
    console.log('エラー内容は...', err);
    return res.status(500).json({message: 'サーバー側でエラーが発生しました。'})

  }

}
