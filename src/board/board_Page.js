import React, { useState } from 'react';
import Footer from "../common/footer";
import MainHeader from '../common/main_header';
import './boardPage.css';
import { useParams, useNavigate } from 'react-router-dom';

function BoardPage({ boardList, deleteBoardItem }) {
  const { No } = useParams();
  const post = boardList.find(post => post.No === Number(No));
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newCommentAuthor, setNewCommentAuthor] = useState(post.User_id);
  const [isPostDeleted, setIsPostDeleted] = useState(false);

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
  };

  const handleDeleteComment = (id) => {
    if (window.confirm("정말 댓글을 삭제하시겠습니까?")) {
      setComments(comments.filter(comment => comment.id !== id));
    }
  };

  const handleDeletePost = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      deleteBoardItem(post.No);
      setIsPostDeleted(true);
      navigate("/board");
    }
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  // if (isPostDeleted) {
  //   return (
  //     <>
  //       <MainHeader />
  //       <div className="board_Page_container" style={{ marginTop: '80px', textAlign: 'center' }}>
  //         <h2>게시글이 삭제되었습니다.</h2>
  //       </div>
  //       <Footer />
  //     </>
  //   );
  // }

  return (
    <>
   
      <div className="board_Page_container" style={{ marginTop: '80px' }}>
        <div>작성시간: {post.작성시간}</div>
        <div>작성자: {post.User_id}</div>
        <div>조회수: 134</div>
        <button style={{ marginLeft: '350px' }} className="board_Page_button">수정</button>
        <button style={{ marginRight: '100px' }} className="board_Page_button" onClick={handleDeletePost}>삭제</button>
      </div>
      <div className="board_Page_container2">글제목: {post.제목}</div>
      <div className="board_Page_container1">
        <p>{post.글내용}</p>
        <p>dsfsdgfghdfhfgh</p>
        <p>dsfsdgfghdfhfgh</p>
        <p>dsfsdgfghdfhfgh</p>
        <p>dsfsdgfghdfhfgh</p>
      </div>

      <div className="board_Page_comment_section">
        <div className="board_Page_comment_form">
          <div style={{ fontSize: "20px", marginBottom: "20px" }}>사용자: {newCommentAuthor}</div>
          <textarea
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
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
                <button onClick={() => handleDeleteComment(comment.id)} style={{ marginLeft: '10px' }}>댓글삭제</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default BoardPage;
