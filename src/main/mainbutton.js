
  import imgMainButton0 from '../img/main-button0.webp'
  import imgMainButton1 from '../img/main-button1.webp'
  import imgMainButton2 from '../img/main-button2.webp'
  import imgMainButton3 from '../img/main-button3.webp'
  import imgMainButton4 from '../img/main-button4.webp'
  import {useNavigate } from 'react-router-dom';
  import './css/main.css';



  function Mainbutton(){
      let navigate = useNavigate();

      return(
        <>
        <div style={{paddingTop:'90px'}}></div>
        <div style={{width:"1280px", margin:"auto"}}>
          <div className="row">
            <div className="col-md-4">
              <div className='center-container'> 
            <img onClick={()=>{navigate('/')}} className="img-mainbutton1" src={imgMainButton0}></img>
            </div>
            <p style={{textAlign: 'center'}}>크림드로우</p>
            <div className='center-container'> 
            <img className="img-mainbutton1" src={imgMainButton1}></img>
            </div>
            <p style={{textAlign: 'center'}}>정가아래</p>
            </div>
            <div className="col-md-4">
            <div className='center-container'> 
            <img onClick={()=>{navigate('/men')}} className="img-mainbutton1" src={imgMainButton2}></img>
            </div>
              <p style={{textAlign: 'center'}}>남성추천</p>
              <div className='center-container'> 
            <img onClick={()=>{navigate('/women')}}  className="img-mainbutton1" src={imgMainButton3}></img>
            </div>
              <p style={{textAlign: 'center'}}>여성추천</p>
            </div>
            <div className="col-md-4">
            <div className='center-container'> 
            <img  className="img-mainbutton1" src={imgMainButton0}></img>
            </div>
              <p style={{textAlign: 'center'}}>나이키</p>
              <div className='center-container'> 
            <img className="img-mainbutton1" src={imgMainButton4}></img>
            </div>
              <p style={{textAlign: 'center'}}>아디다스</p>
            </div>
          </div>
        </div>
        </>
      );
  };

  export default Mainbutton;