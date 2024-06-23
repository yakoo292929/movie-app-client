/**
 * ===========================================================================================
 * SYSTEM NAME    : movie-app
 * PROGRAM ID     : client/src/pages/api/searchMedia.js
 * PROGRAM NAME   : searchMedia.js
 *                : API：メディア検索 API
 * DEVELOPED BY   : yamabake
 * CREATE DATE    : 2024/06/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import axios from "axios";

export default async(req, res) => {
  const {searchQuery} = req.query;
  console.log(searchQuery);

  if (!searchQuery) {
      return res.status(400).json({message: '検索文字がありません。'});

  }

  try {
    // TMDB API
    const response = await axios(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}&language=ja-JP`);
    res.status(200).json(response.data);
    console.log('取得したデータは...', response.data.results);

  } catch(err) {
    console.log('エラー内容は...', err);
    return res.status(500).json({message: 'サーバー側でエラーが発生しました。'})

  }

}
