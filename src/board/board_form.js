// Board_form.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardForm.css';
import Footer from "../common/footer";
import MainHeader from '../common/main_header';

function Board_form({ addBoardItem, boardList }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    // boardList가 비어있지 않은 경우 마지막 항목의 User_id를 사용
    const userId = boardList.length > 0 ? boardList[boardList.length - 1].User_id : 'default_user_id';
  
    const newItem = {
      No: boardList.length + 1,
      제목: title,
      User_id: userId,
      작성시간: new Date().toLocaleString(),
      content: content,
      file: selectedFile,
    };
  
    addBoardItem(newItem);
    navigate("/board");
  };
  return (
    <>
      <MainHeader></MainHeader>
      <div style={{ paddingTop: '50px' }}></div>
      <div className="board_form_container">
        <h1>글작성</h1>
        <div className="form_group">
          <label htmlFor="title">작성자</label>
          <div><h4>{boardList[0].User_id}</h4></div>
        </div>
        <div className="form_group">
          <label htmlFor="title">제목</label>
          <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form_group">
          <label htmlFor="content">내용</label>
          <textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div className="form_group">
          <label htmlFor="file">사진 첨부</label>
          <input type="file" id="file" name="file" onChange={handleFileChange} />
          {selectedFile && <p>첨부된 파일: {selectedFile.name}</p>}
        </div>
        <div className="form_buttons">
          <button className="submit_button" onClick={handleSubmit}>제출</button>
          <button className="cancel_button" onClick={() => navigate("/board")}>취소</button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Board_form;
