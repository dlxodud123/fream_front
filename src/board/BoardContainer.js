// BoardContainer.js
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardList from './BoardList';
import Board_form from './board_form';
import board_data from './boardData';
import MainHeader from '../common/main_header';
import BoardPage from './board_Page';

function BoardContainer() {
  const [boardList, setBoardList] = useState(board_data);

  const addBoardItem = (newItem) => {
    setBoardList((prevList) => [...prevList, newItem]);
  };

  return (
    <Routes>
      <Route path="/board" element={<BoardList boardList={boardList} />} />
      <Route path="/Board_form" element={<Board_form addBoardItem={addBoardItem} boardList={boardList} />} />
      <Route path='/board/:No' element={<BoardPage boardList={boardList}></BoardPage> }></Route>
    </Routes>
  );
}

export default BoardContainer;
