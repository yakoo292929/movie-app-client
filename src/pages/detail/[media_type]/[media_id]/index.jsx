/**
 * ===========================================================================================
 * SYSTEM NAME    : movie-app
 * PROGRAM ID     : client/src/pages/detail/[media_type]/[media_id]/index.jsx
 * PROGRAM NAME   : index.jsx
 *                : 画面：作品詳細画面
 * DEVELOPED BY   : yamabake
 * CREATE DATE    : 2024/06/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import AppLayout from '@/components/Layouts/AppLayout';
import laravelAxios from '@/lib/laravelAxios';
import axios from '@/lib/laravelAxios';
import { Box, ButtonGroup, Card, CardContent, Container, Fab, Grid, IconButton, Rating, Tooltip, Typography } from '@mui/material';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { TextareaAutosize } from '@mui/base';
import { Button, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '@/hooks/auth';
import Link from 'next/link';

const Detail = ({ detail, media_type, media_id }) => {

  /////////////////////////////////////////////
  // 状態関数
  /////////////////////////////////////////////
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editedRating, setEditedRating] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);

  const { user } = useAuth({middleware: 'auth'});

  /////////////////////////////////////////////
  // モーダルウィンドウOpen
  /////////////////////////////////////////////
  const handleOpen = () => {
    setOpen(true);
  }

  /////////////////////////////////////////////
  // モーダルウィンドウClose
  /////////////////////////////////////////////
  const handleClose = () => {
    setOpen(false);
  }

  /////////////////////////////////////////////
  // レビュー内容変更
  /////////////////////////////////////////////
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  }

  /////////////////////////////////////////////
  // レビュー評価変更
  /////////////////////////////////////////////
  const handleRatingChange = (e, newValue) => {
    setRating(newValue);
  }

  /////////////////////////////////////////////
  // 送信ボタンクリック判断
  /////////////////////////////////////////////
  const isButtonDisabled = (rating, content) => {
    return !rating || !content.trim();
  }

  const isReviewButtonDisabled = isButtonDisabled(rating, review);
  const isEditButtonDisabled = isButtonDisabled(editedRating, editedContent);

  /////////////////////////////////////////////
  // 送信ボタンクリック
  /////////////////////////////////////////////
  const handleReviewAdd = async() => {

    // モーダルウィンドウClose
    handleClose();

    try {
      // LavavelAPI:レビュー登録
      const response = await laravelAxios.post(`api/reviews`, {
        content: review,
        rating: rating,
        media_type: media_type,
        media_id: media_id,
      });

      const newReview = response.data;
      setReviews([...reviews, newReview]);

      // 入力内容初期化
      setReview('');
      setRating(0);

      // 作品評価計算
      const updateReviews = [...reviews, newReview];
      updateAverageRating(updateReviews);

    } catch(err) {
      console.log(err);

    }
  }

  /////////////////////////////////////////////
  // 作品評価計算
  /////////////////////////////////////////////
  const updateAverageRating = (updateReviews) => {

    if (updateReviews.length > 0) {
        // レビューの星の数の合計値を計算
        const totalRating = updateReviews.reduce((acc, review) => acc + review.rating, 0);

        // レビューの星の数の平均計算
        const average = (totalRating / updateReviews.length).toFixed(1);
        setAverageRating(average);

    } else {
        setAverageRating(null);
    }

  }

  /////////////////////////////////////////////
  // 削除ボタンクリック
  /////////////////////////////////////////////
  const handleDelete = async(id) => {

    if (window.confirm('レビューを削除してもよろしいですか？')) {
        try {
          // LavavelAPI:削除
          const response = await laravelAxios.delete(`api/review/${id}`);
          // 削除以外のレビュー取得
          const filterReviews = reviews.filter((review) => review.id !== id );
          setReviews(filterReviews);

          // 作品評価計算
          updateAverageRating(filterReviews);

        } catch(err) {
          console.log(err);

        }
    }

  }

  /////////////////////////////////////////////
  // 編集ボタンクリック
  /////////////////////////////////////////////
  const handleEdit = (review) => {

    setEditMode(review.id);
    setEditedRating(review.rating);
    setEditedContent(review.content);

  }

  /////////////////////////////////////////////
  // 編集確定ボタンクリック
  /////////////////////////////////////////////
  const handleConfirmEdit = async(reviewId) => {

    try {
      // LavavelAPI:更新
      const response = await laravelAxios.put(`api/review/${reviewId}`, {
        rating: editedRating,
        content: editedContent,
      });
      const updatedReview = response.data;

      const updatedReviews = reviews.map((review) => {
        // 編集対象
        if (review.id === reviewId) {
            return {
              ...review,
              content: updatedReview.content,
              rating: updatedReview.rating,
            }
        }
        // 編集対象外
        return review;

      });
      // 画面反映
      setReviews(updatedReviews);

      // 作品評価計算
      updateAverageRating(updatedReviews);

      // 編集モード終了
      setEditMode(null);

    } catch(err) {
      console.log(err);
    }

  }

  /////////////////////////////////////////////
  // お気に入りアイコンクリック
  /////////////////////////////////////////////
  const handleToggleFavorite = async() => {

    try {
      // LavavelAPI:お気に入り登録
      const response = await laravelAxios.post(`api/favorites`,{
        media_type: media_type,
        media_id: media_id,
      });
      setIsFavorited(response.data.status === 'added');

    } catch(err) {
      console.log(err);

    }

  }

  /////////////////////////////////////////////
  // リロード
  /////////////////////////////////////////////
  useEffect(()=> {

    // レビュー取得
    const fetchReviews = async() => {
      try {
        // LavavelAPI:レビュー取得
        const [reviewResponse, favoriteResponse] = await Promise.all([
          laravelAxios.get(`api/reviews/${media_type}/${media_id}`),
          laravelAxios.get(`api/favorites/status`,{
            params: {
              media_type: media_type,
              media_id: media_id,
            }
          })
        ])
        const fetchReviews = reviewResponse.data;
        setReviews(fetchReviews);

        // 作品評価計算
        updateAverageRating(fetchReviews);

        // お気に入り状態表示
        setIsFavorited(favoriteResponse.data);

      } catch(err) {
        console.log(err);

      }
    }

    fetchReviews();

  }, [media_type, media_id]);


  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <AppLayout

      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          作品詳細
        </h2>
      }>

      <Head>
        <title>Movie-App-作品詳細</title>
      </Head>

      {/* 映画情報 */}
      <Box
        sx={{
          height: { xs: "auto", md: "70vh" } ,
          bgcolor: "red",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}

      >

        {/* 背景画像 */}
        <Box
          sx={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${detail.backdrop_path})`,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",

            '&::before': {
              content: '""',
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(10px)",
            }
          }}
        />
        {/* 背景画像 */}

        {/* 作品情報 */}
        <Container sx={{zIndex: 1,}}>
          <Grid container sx={{color: "white", alignItems: "center"}}>

            <Grid item md={4} sx={{display: "flex", justifyContent: "center"}}>
              <img width={"70%"}  src={`https://image.tmdb.org/t/p/original${detail.poster_path}`} />
            </Grid>

            <Grid item md={8}>
              {/* 作品名 */}
              <Typography variant="h4" paragraph>{detail.title || detail.name}</Typography>

              {/* お気に入りアイコン */}
              <IconButton onClick={handleToggleFavorite} style={{color: isFavorited ? "red" : "white", background: "#0d253f"}}>
                <FavoriteIcon />
              </IconButton>

              {/* あらすじ */}
              <Typography paragraph>{detail.overview}</Typography>


              {/* 作品評価 */}
              <Box
                gap={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb:2
                }}
              >
                <Rating
                  readOnly
                  precision={0.5}
                  value={parseFloat(averageRating)}
                  emptyIcon={<StarIcon style={{color: "white"}}/>}
                />

                <Typography
                  sx={{
                    ml:1,
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {averageRating}
                </Typography>

              </Box>
              {/* 作品評価 */}

              <Typography variant="h6">
                {media_type ==="movie" ? `公開日：${detail.release_date}` : `初回放送日：${detail.first_air_date}`}
              </Typography>
            </Grid>

          </Grid>
        </Container>
        {/* 作品情報 */}

      </Box>
      {/* 映画情報 */}

      {/* レビュー内容 */}
      <Container sx={{py: 4}}>
        <Typography
          component={"h1"}
          variant="h4"
          gutterBottom
        >
          レビュー一覧
        </Typography>

        <Grid container spacing={3}>
          {reviews.map((review) => (
            <Grid item xs={12} key={review.id}>
              <Card>

                <CardContent>

                  {/* ユーザー名 */}
                  <Typography
                    variant="h6"
                    component={"div"}
                    gutterBottom
                  >
                    {review.user.name}
                  </Typography>

                  {editMode === review.id ? (
                    <>
                      {/* 編集ボタンを押された場合 */}
                      {/* 星 */}
                      <Rating value={editedRating} onChange={(e, newValue) => setEditedRating(newValue)}/>
                      {/* レビュー内容 */}
                      <TextareaAutosize
                        minRows={3}
                        style={{width: "100%"}}
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      {/* 通常 */}

                      {/* 星 */}
                      <Rating
                        value={review.rating}
                        readOnly
                      />

                      {/* レビュー内容 */}
                      <Link href={`/detail/${media_type}/${media_id}/review/${review.id}`}>
                        <Typography
                          variant="body2"
                          color="textSecodary"
                          paragraph
                        >
                          {review.content}
                        </Typography>
                      </Link>
                    </>
                  )}

                  {/* ログインユーザーのみボタン表示 */}
                  {user.id === review.user.id && (
                    <Grid sx={{display: "flex", justifyContent: "flex-end"}}>
                      {editMode === review.id ? (
                        <Button onClick={() => handleConfirmEdit(review.id)} disabled={isEditButtonDisabled}>編集確定</Button>
                      ) : (
                        <ButtonGroup>
                          <Button onClick={() => handleEdit(review)}>編集</Button>
                          <Button color="error" onClick={() => handleDelete(review.id)}>削除</Button>
                        </ButtonGroup>

                      )}

                    </Grid>
                  )}

                </CardContent>
              </Card>
            </Grid>
          ))}

        </Grid>

      </Container>
      {/* レビュー内容 */}

      {/* レビュー追加ボタン */}
      <Box
        sx={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          zIndex: 5,
        }}
      >
        <Tooltip title="レビュー追加">
          <Fab
            style={{backgroundColor: "#1976d2", color: "white"}}
            onClick={handleOpen}
          >
            <AddIcon />

          </Fab>

        </Tooltip>

      </Box>
      {/* レビュー追加ボタン */}

      {/* モーダルウィンドウ */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            border: "1px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >

          <Typography variant="h6" component="h2">
            レビューを書く
          </Typography>

          <Rating
            required
            onChange={handleRatingChange}
            value={rating}
          />

          <TextareaAutosize
            required
            minRows={5}
            placeholder="レビュー内容"
            style={{width: "100%", marginTop: "10px"}}
            onChange={handleReviewChange}
            value={review}
          />

          <Button
            variant='outlined'
            disabled={isReviewButtonDisabled}
            onClick={handleReviewAdd}
          >
            送信
          </Button>

        </Box>
      </Modal>
      {/* モーダルウィンドウ */}

    </AppLayout>
  )

}


/////////////////////////////////////////////
// SSR
/////////////////////////////////////////////
export async function getServerSideProps(context) {
  const { media_type, media_id  } = context.params;

  try {
    // 作品詳細取得 API
    const jpResponse = await axios.get(`https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`);

    let combinedData = {...jpResponse.data}

    if (!jpResponse.data.overview) {
        const enResponse =  await axios.get(`https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
        combinedData.overview = enResponse.data.overview;
    }

    return {
      props: {detail: combinedData, media_type, media_id}

    }

  } catch(err) {
    return { notFound: true };


  }

}

export default Detail;
