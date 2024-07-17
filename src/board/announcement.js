import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './boardPage.css';

function Announcement({ boardList }) {
    const navigate = useNavigate();

    if (!boardList) {
        return <div>해당 게시물을 찾을 수 없습니다.</div>;
    }

    return (
        <>
            <div className="board_Page_container" style={{ marginTop: '80px' }}>
                <div style={{ textAlign:'left',marginLeft:'30px'}}>작성시간: {boardList[0].작성시간}</div>
                <div style={{marginRight:'700px'}}>작성자: {boardList[0].User_id}</div>
                <div>조회수: 134</div>
            </div>
            
            <div className="board_Page_container2">
                <div style={{border:'2px solid red', width:'150px',marginLeft:'555px',color:'red',borderRadius:'10px',marginBottom:'10px',fontSize:'20px'}}>🚨 공지사항 🚨</div>
                     글제목: {boardList[0].제목} </div>
            <div className="board_Page_container1" style={{height:'400px'}}>
                <div dangerouslySetInnerHTML={{ __html: boardList[0].글내용 }} />
            </div>
        </>
    );
}

export default Announcement;
