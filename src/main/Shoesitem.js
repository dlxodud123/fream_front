import {useNavigate } from 'react-router-dom';


function Shoesitem0(props){
    console.log(props.shoes)
    const naviagte = useNavigate();
    console.log(props.shoes.id)
    return(
        <>
          <div style={{textAlign:"center"}} className="col-md-4">
            <img onClick={()=>naviagte(`/products/${props.shoes.prid}`)} className="img-a-1" src={`./images/${props.shoes.imgName}`} style={{background:'#f4f4f4'}}/>
            <div style={{textAlign:"left", marginLeft:"65px"}}>
            <h6 onClick={()=>naviagte(`/products/${props.shoes.prid}`)} className='cursor'>{props.shoes.brand}</h6>
            <h4 onClick={()=>naviagte(`/products/${props.shoes.prid}`)} className='cursor'>{props.shoes.nameKor}</h4>
            <h6 style={{fontWeight:'bold'}} onClick={()=>naviagte(`/products/${props.shoes.prid}`)} className='cursor'>{props.shoes.price}원</h6>
            </div>
          </div>

          </>
    )
  }


  // Shoesitem2 컴포넌트에 getData 함수 추가


  export {Shoesitem0} ;