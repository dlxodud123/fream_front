import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardList from './BoardList';
import BoardForm from './board_form';
import EditBoardForm from './EditBoardForm';
import board_data from './boardData';
import BoardPage from './board_Page';
import MainHeader from '../common/main_header';
import Footer from '../common/footer';
import Announcement from './announcement';
import axios from "axios";

function BoardContainer() {
  const [boardList, setBoardList] = useState(board_data);

  const addBoardItem = (newItem) => {
    setBoardList((prevList) => [...prevList, newItem]);
    console.log("Updated BoardList:", [...boardList, newItem]); // 업데이트된 상태 확인
  };

  const deleteBoardItem = (postId) => {
    setBoardList((prevList) => prevList.filter(post => post.No !== postId));
  };

  const updateBoardItem = (updatedItem) => {
    setBoardList((prevList) => 
      prevList.map(item => (item.No === updatedItem.No ? updatedItem : item))
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.0.13:3001/board");
        setBoardList(response.data);
        console.log(response.data); // 상태 업데이트 후의 데이터를 로그로 출력
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MainHeader />
      <Routes>
        <Route path="/board" element={<BoardList boardList={boardList} />} />
        <Route path="/Board_form" element={<BoardForm addBoardItem={addBoardItem} boardList={boardList} />} />
        <Route path='/board/:No' element={<BoardPage boardList={boardList} deleteBoardItem={deleteBoardItem} />} />
        <Route path='/edit/:No' element={<EditBoardForm boardList={boardList} updateBoardItem={updateBoardItem} />} />
        <Route path='/announcement' element={<Announcement boardList={boardList} deleteBoardItem={deleteBoardItem} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default BoardContainer;
