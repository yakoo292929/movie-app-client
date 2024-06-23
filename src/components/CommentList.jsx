/**
 * ===========================================================================================
 * SYSTEM NAME    : movie-app
 * PROGRAM ID     : client/src/components/CommentList.jsx
 * PROGRAM NAME   : MediaCard.jsx
 *                : コンポーネント：コメントリスト
 * DEVELOPED BY   : yamabake
 * CREATE DATE    : 2024/06/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import laravelAxios from '@/lib/laravelAxios';
import { Grid } from '@mui/material';
import React, { useState } from 'react';
import Comment from './Comment';

const CommentList = ({ comments, setComments }) => {

  /////////////////////////////////////////////
  // 状態関数
  /////////////////////////////////////////////
  const [editMode, setEditMode] = useState(null);
  const [editedContent, setEditedContent] = useState('');


  /////////////////////////////////////////////
  // 削除ボタンクリック
  /////////////////////////////////////////////
  const handleDelete = async(commentId) => {

    try {
      // LavavelAPI:コメント削除
      const response = await laravelAxios.delete(`api/comments/${commentId}`);
      console.log(response.data);

      // 削除以外のコメント取得
      const filterdComments = comments.filter((comment) => comment.id !== commentId);
      setComments(filterdComments);

    } catch(err) {
      console.log(err);

    }

  }

  /////////////////////////////////////////////
  // 編集ボタンクリック
  /////////////////////////////////////////////
  const handleEdit = (comment) => {

    setEditMode(comment.id);
    setEditedContent(comment.content);

  }

  /////////////////////////////////////////////
  // 編集確定ボタンクリック
  /////////////////////////////////////////////
  const handleConfirmEdit = async(commentId) => {

    try {
      // LavavelAPI:更新
      const response = await laravelAxios.put(`api/comment/${commentId}`, {
        content: editedContent,
      });

      const updatedComment = response.data;

      const updatedComments = comments.map((comment) => {
        // 編集対象
        if (comment.id === commentId) {
            return {
              ...comment,
              content: updatedComment.content,
            }
        }
        // 編集対象外
        return comment;

      });
      // 画面反映
      setComments(updatedComments);

      // 編集モードをやめる
      setEditMode(null);


    } catch(err) {
      console.log(err);

    }

  }

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (
    <Grid container spacing={3} sx={{mt: 2}}>

        {/* 配列を展開 */}
        {comments.map((comment) => (
          <Grid item xs={12} key={comment.id}>
            <Comment
              comment={comment}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              editMode={editMode}
              editedContent={editedContent}
              setEditedContent={setEditedContent}
              handleConfirmEdit={handleConfirmEdit}
            />
          </Grid>
        ))}

    </Grid>
  )

}

export default CommentList;
