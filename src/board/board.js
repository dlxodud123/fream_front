import MainHeader from "../common/main_header";
import Footer from "../common/footer";
import BoardList from "./BoardList";
function Board(){
    return(
        <>

        <MainHeader></MainHeader>
        <div style={{height:'100px'}}></div>
        <div style={{width:"1280px",margin:'auto'}}>
        <h1 style={{textAlign:'center'}}>공지사항</h1>
        </div>
        <BoardList></BoardList>
        <div style={{height:'100px'}}></div>
        <Footer></Footer>
        </>
    )

}

export default Board;