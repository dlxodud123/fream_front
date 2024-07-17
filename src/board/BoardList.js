import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './board.css';

function BoardList({ boardList }) {
  const navigate = useNavigate();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(boardList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = boardList.slice(startIndex, endIndex);

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
        <div   className='notice'>
          <div className='notice-container' >
            <div onClick={()=>{navigate('/announcement')}} className='icon'>⚡</div>
            <div onClick={()=>{navigate('/announcement')}}  className='text'>공지사항</div>
            <div onClick={()=>{navigate('/announcement')}}  className='details'>:{boardList.title}</div>
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
              <Link className='board_link' to={`/board/${board.No}`}>{board.title}</Link>
              <Link className='board_link' to={`/board/${board.No}`}>{board.user}</Link>
              <Link className='board_link' to={`/board/${board.No}`}><p style={{fontSize:'17px',}}>{board.작성시간}</p></Link>
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
