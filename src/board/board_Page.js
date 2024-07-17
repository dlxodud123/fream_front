import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './boardPage.css';

function BoardPage({ boardList, deleteBoardItem }) {
  const { No } = useParams();
  const post = boardList.find(post => post.No === Number(No));
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newCommentAuthor, setNewCommentAuthor] = useState(post.User_id);

  if (!post) {
    return <div>해당 게시물을 찾을 수 없습니다.</div>;
  }

  // 댓글 추가 핸들러
  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentData = {
      id: comments.length + 1,
      author: newCommentAuthor,
      content: newComment,
      likes: 0,
      dislikes: 0,
    };

    setComments(prevComments => {
      const isDuplicate = prevComments.some(comment => comment.content === newCommentData.content);
      if (isDuplicate) return prevComments;

      return [...prevComments, newCommentData];
    });

    setNewComment(""); // Clear the input after adding comment
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = (id) => {
    if (window.confirm("정말 댓글을 삭제하시겠습니까?")) {
      setComments(prevComments => prevComments.filter(comment => comment.id !== id));
    }
  };

  // 게시글 삭제 핸들러
  const handleDeletePost = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      deleteBoardItem(post.No);
      navigate("/board");
    }
  };

  // Enter 키 다운 핸들러
  const handleKeyDown = (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      handleAddComment();
    }
  };

  // 줄바꿈 문자를 HTML <br>로 변환하는 함수
  const formatCommentContent = (content) => {
    return content
      .split('\n')
      .map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
  };

  return (
    <>
      <div className="board_Page_container" style={{ marginTop: '80px' }}>
        <div>작성시간: {post.date}</div>
        <div>작성자: {post.user}</div>
        <div>조회수: 134</div>
        <button style={{ marginLeft: '350px' }} className="board_Page_button" onClick={() => navigate(`/edit/${post.No}`)}>수정</button>
        <button style={{ marginRight: '100px' }} className="board_Page_button" onClick={handleDeletePost}>삭제</button>
      </div>
      <div className="board_Page_container2">글제목: {post.제목}</div>
      <div className="board_Page_container1">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      <div className="board_Page_comment_section">
        <div className="board_Page_comment_form">
          <div style={{ fontSize: "20px", marginBottom: "20px" }}>사용자: {newCommentAuthor}</div>
          <textarea
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
          <button style={{borderRadius:'10px', backgroundColor:'white', border:'1px solid rgb(0,0,0,0.1)'}} onClick={handleAddComment}>등록</button>
        </div>
        <ul className="board_Page_comment_list">
          {comments.map(comment => (
            <li key={comment.id} className="board_Page_comment_item">
              <div className="board_Page_comment_content">
                <strong style={{display:'flex'}}>🌈{comment.author} <div style={{marginLeft:'10px', border:'1px solid red', color:'red', borderRadius:'10px', padding:'1px', marginTop:'-1px',fontSize:'12px',paddingLeft:'8px',paddingRight:'8px'}}><p style={{margin:'2px'}}>사용자</p></div></strong>
                <p>{formatCommentContent(comment.content)}</p>
              </div>
              <div className="board_Page_comment_actions">
                <button onClick={() => setComments(comments.map(c => c.id === comment.id ? { ...c, likes: c.likes + 1 } : c))}>👍좋아요 {comment.likes}</button>
                <button onClick={() => setComments(comments.map(c => c.id === comment.id ? { ...c, dislikes: c.dislikes + 1 } : c))}>👎싫어요 {comment.dislikes}</button>
                <button onClick={() => handleDeleteComment(comment.id)} style={{ marginLeft: '10px' }}>❌댓글삭제</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default BoardPage;
