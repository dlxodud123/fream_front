import React, { useState } from 'react';
import Footer from "../common/footer";
import MainHeader from '../common/main_header';
import './boardPage.css';

function BoardPage({ boardList }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newCommentAuthor, setNewCommentAuthor] = useState("");

  const handleAddComment = () => {
    const newCommentData = {
      id: comments.length + 1,
      author: newCommentAuthor,
      content: newComment,
      likes: 0,
      dislikes: 0
    };
    setComments([...comments, newCommentData]);
    setNewComment("");
    setNewCommentAuthor("");
  };

  const handleLike = (id) => {
    setComments(
      comments.map(comment =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  const handleDislike = (id) => {
    setComments(
      comments.map(comment =>
        comment.id === id ? { ...comment, dislikes: comment.dislikes + 1 } : comment
      )
    );
  };

  return (
    <>
      <MainHeader />
      <div className="board_Page_container" style={{marginTop:'80px'}}>
        <div>작성시간: {boardList[9].작성시간}</div>
        <div>작성자: {boardList[0].User_id}</div>
        <div>조회수: 134</div>
        <button style={{marginLeft:'350px'}} className="board_Page_button">수정</button>
        <button style={{marginRight:'100px'}} className="board_Page_button">삭제</button>
      </div>
      <div className="board_Page_container2">글제목: {boardList[0].제목}</div>
      <div className="board_Page_container1">
        <p>{boardList[0].글내용}</p>
        <p>dsfsdgfghdfhfgh</p>
        <p>dsfsdgfghdfhfgh</p>
        <p>dsfsdgfghdfhfgh</p>
        <p>dsfsdgfghdfhfgh</p>
      </div>

      <div className="board_Page_comment_section">
        <div className="board_Page_comment_form">
          <input
            type="text"
            placeholder='닉네임'
            value={newCommentAuthor}
            onChange={(e) => setNewCommentAuthor(e.target.value)}
          />
          <textarea
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button onClick={handleAddComment}>댓글 달기</button>
        </div>
        <ul className="board_Page_comment_list">
          {comments.map(comment => (
            <li key={comment.id} className="board_Page_comment_item">
              <div className="board_Page_comment_content">
                <strong>{comment.author}</strong>
                <p>{comment.content}</p>
              </div>
              <div className="board_Page_comment_actions">
                <button onClick={() => handleLike(comment.id)}>👍좋아요 {comment.likes}</button>
                <button onClick={() => handleDislike(comment.id)}>👎싫어요 {comment.dislikes}</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default BoardPage;
