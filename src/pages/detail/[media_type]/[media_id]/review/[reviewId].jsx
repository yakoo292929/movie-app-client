/**
 * ===========================================================================================
 * SYSTEM NAME    : movie-app
 * PROGRAM ID     : client/src/pages/detail/[media_type]/[media_id]/review/[reviewId].jsx
 * PROGRAM NAME   : [reviewId].jsx
 *                : 画面：レビュー詳細画面
 * DEVELOPED BY   : yamabake
 * CREATE DATE    : 2024/06/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import CommentList from '@/components/CommentList';
import AppLayout from '@/components/Layouts/AppLayout';
import laravelAxios from '@/lib/laravelAxios';
import { Box, Button, Card, CardContent, Rating, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ReviewDetail = () => {

  /////////////////////////////////////////////
  // 状態関数
  /////////////////////////////////////////////
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  // URLからReviewIDを取得
  const router = useRouter();
  const { reviewId } = router.query;

  /////////////////////////////////////////////
  // リロード
  /////////////////////////////////////////////
  useEffect(() => {

    // undefined時は実行しない
    if (!reviewId) {
        return;
    }

    // レビュー詳細取得
    const fetchReviewDetail = async() => {

      try {
        // LavavelAPI:レビュー詳細取得
        const response = await laravelAxios.get(`api/review/${reviewId}`);
        // レビュー・コメント状態管理
        setReview(response.data);
        setComments(response.data.comments);

      } catch(err) {
        console.log(err);

      }
    }

    fetchReviewDetail();

  }, [reviewId]);


  /////////////////////////////////////////////
  // レビュー返信内容変更
  /////////////////////////////////////////////
  const handleChange = (e) => {
    setContent(e.target.value);
    console.log(setContent);
  }

  /////////////////////////////////////////////
  // 送信ボタンクリック
  /////////////////////////////////////////////
  const handleCommentAdd = async(e) => {
    e.preventDefault();
    const trimmedContent = content.trim();

    // 空文字チェック
    if (!trimmedContent) {
        return
    }

    try {
      // LavavelAPI:返信コメント登録
      const response = await laravelAxios.post(`api/comments`, {
        content: trimmedContent,
        review_id: reviewId,
      });

      const newComment = response.data
      setComments([...comments, newComment]);

      // 入力内容初期化
      setContent('');


    } catch(err) {
      console.log(err);

    }

  }

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <AppLayout

      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          レビュー詳細
        </h2>
      }>

      <Head>
        <title>Movie-App-レビュー詳細</title>
      </Head>

      <Container sx={{py :2}}>

        {review ? (
          <>
            {/* レビュー内容 */}
            <Card sx={{ minHeight: '200px' }}>
              <CardContent>
                  {/* ユーザー名 */}
                  <Typography
                      variant="h6"
                      component="div"
                      gutterBottom>
                      {review.user.name}
                  </Typography>

                  {/* 星の数 */}
                  <Rating
                      name="read-only"
                      value={review.rating}
                      readOnly
                  />

                  {/* レビュー内容 */}
                  <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p">
                      {review.content}
                  </Typography>
              </CardContent>
            </Card>

            {/* 返信用のフォーム */}
            <Box
                component="form"
                onSubmit={handleCommentAdd}
                noValidate
                autoComplete="off"
                p={2}
                sx={{
                    mb: 2,
                    display: 'flex',
                    alignItems: 'flex-start',
                    bgcolor: 'background.paper',
                }}
            >
                <TextField
                    inputProps={{ maxLength: 200 }}
                    error={content.length > 200}
                    helperText={content.length > 200 ? '200文字を超えています' : ''}
                    fullWidth
                    label="コメント"
                    variant="outlined"
                    value={content}
                    sx={{ mr: 1, flexGrow: 1 }}
                    onChange={handleChange}

                />
                <Button
                    variant="contained"
                    type="submit"
                    style={{
                        backgroundColor: '#1976d2',
                        color: '#fff',
                    }}
                >
                    送信
                </Button>
            </Box>

            {/* コメント */}
            <CommentList comments={comments} setComments={setComments} />

          </>
        ) : (
          <div>Loading...</div>
        )}

      </Container>

    </AppLayout>
  )
}

export default ReviewDetail;
