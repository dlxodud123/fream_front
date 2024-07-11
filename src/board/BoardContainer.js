import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardList from './BoardList';
import Board_form from './board_form';
import board_data from './boardData';
import BoardPage from './board_Page';
import MainHeader from '../common/main_header';
import Footer from '../common/footer';

function BoardContainer() {
  const [boardList, setBoardList] = useState(board_data);

  const addBoardItem = (newItem) => {
    setBoardList((prevList) => [...prevList, newItem]);
  };

  const deleteBoardItem = (postId) => {
    setBoardList((prevList) => prevList.filter(post => post.No !== postId));
  };

  return (
    <>
      <MainHeader />
      <Routes>
        <Route path="/board" element={<BoardList boardList={boardList} />} />
        <Route path="/Board_form" element={<Board_form addBoardItem={addBoardItem} boardList={boardList} />} />
        <Route path='/board/:No' element={<BoardPage boardList={boardList} deleteBoardItem={deleteBoardItem} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default BoardContainer;
