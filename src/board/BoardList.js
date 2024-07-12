// BoardList.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './board.css';
import MainHeader from '../common/main_header';
import Footer from '../common/footer';

function BoardList({ boardList }) {
  const navigate = useNavigate();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 총 페이지 수 계산
  const totalPages = Math.ceil(boardList.length / itemsPerPage);

  // 현재 페이지에 해당하는 아이템 인덱스 범위 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // 현재 페이지에 해당하는 아이템 슬라이싱
  const currentItems = boardList.slice(startIndex, endIndex);

  // 페이지 변경 처리
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
    navigate("/Board_form");
  };

  return (
    <>
    
    <div style={{ marginTop: '100px' }} className='board_list'>
        <div className='notice'>
          <div className='notice-container'>
            <div className='icon'>⚡</div>
            <div className='text'>공지사항</div>
            <div className='details'>: asdasdasdas</div>
          </div>
        </div>
        <div style={{ borderBottom: '1px solid black' }} className='board_header'>
          <div>No</div>
          <div>제목</div>
          <div>글쓴이</div>
          <div>작성시간</div>
        </div>

        <div className='board_content'>
          {currentItems.map((board) => (
            <div className='board_item' key={board.No}>
              <Link className='board_link' to={`/board/${board.No}`}>{board.No}</Link>
              <Link className='board_link' to={`/board/${board.No}`}>{board.제목}</Link>
              <Link className='board_link' to={`/board/${board.No}`}>{board.User_id}</Link>
              <Link className='board_link' to={`/board/${board.No}`}>{board.작성시간}</Link>
            </div>
          ))}
          <div style={{ borderTop: '1px solid black', paddingTop: '30px', textAlign: 'right' }} className='write-button-container'>
            <button 
              className={`write-button ${isButtonClicked ? 'clicked' : ''}`}
              onClick={handleButtonClick}
            >
              글 작성
            </button>
          </div>
        </div>
      </div>
    
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className='boardlist_button'
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          이전
        </button>
        
        {Array.from({ length: totalPages }, (_, index) => (
         
         <button style={{ border:'1px solid rgb(0,0,0,0.1)', backgroundColor:'white', borderRadius:'10px', width:'50px',height:'40px'}}
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        

        <button className='boardlist_button'
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          다음
        </button>
      </div>
    
    </>
  );
}

export default BoardList;
