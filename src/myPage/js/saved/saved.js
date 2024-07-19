import Header from '../../../common/header';
import Footer from '../../../common/footer';
import './saved.css';
import MypageList from '../MypageList';
function Saved(){
    return(
        <>
         <div style={{margin:'0 auto', padding:'0', width:'1280px'}}>
        <Header />



        <div style={{marginLeft:'40px', marginTop:'35px',display:'flex'}}>
        <MypageList>
        </MypageList>
        <div style={{marginLeft:'100px', paddingBottom:'20px'}}>
        <h3 >관심</h3>
            <div style={{borderBottom:'1px solid black'}}>
 
            </div>
            </div>
        </div>
     
        <Footer />
        </div>
        </>
    )
}

export default Saved;