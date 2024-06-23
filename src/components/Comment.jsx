/**
 * ===========================================================================================
 * SYSTEM NAME    : movie-app
 * PROGRAM ID     : client/src/components/CommentList.jsx
 * PROGRAM NAME   : MediaCard.jsx
 *                : コンポーネント：コメント
 * DEVELOPED BY   : yamabake
 * CREATE DATE    : 2024/06/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { Button, ButtonGroup, Card, CardContent, Grid, TextareaAutosize, Typography } from '@mui/material';
import React from 'react';

const Comment = ({ comment, handleDelete, handleEdit, editMode, editedContent, setEditedContent, handleConfirmEdit}) => {

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <Card>
      <CardContent>

        {/* ユーザー名 */}
        <Typography variant="h6" component="div" gutterBottom>
          {comment.user.name}
        </Typography>

        {editMode === comment.id ? (
          // 編集中のコメントの場合
          <TextareaAutosize
            minRows={3}
            style={{width: "100%"}}
            value={editedContent}
            onChange={(e) => {setEditedContent(e.target.value)}}
          />

        ) : (
          <>

            {/* コメント内容 */}
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
              paragraph
            >
              {comment.content}
            </Typography>
          </>
        ) }

        <Grid container justifyContent="flex-end">
          {editMode === comment.id ? (
            <Button onClick={() => handleConfirmEdit(comment.id)}>編集確定</Button>
          ) : (
            <ButtonGroup>
              <Button onClick={() => handleEdit(comment)} >編集</Button>
              <Button color="error" onClick={() => handleDelete(comment.id)}>削除</Button>
            </ButtonGroup>
          )}
        </Grid>

      </CardContent>
    </Card>

  )

}

export default Comment;
