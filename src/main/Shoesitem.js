import {useNavigate } from 'react-router-dom';

function Shoesitem0(props){
    console.log(props.shoes)
    const naviagte = useNavigate();
    return(
        <>
          <div style={{textAlign:"center"}} className="col-md-4">
            <img onClick={()=>naviagte(`/product/${props.shoes.id}`)} className="img-a-1" src={props.shoes.img}/>
            <div style={{textAlign:"left", marginLeft:"65px"}}>
            <h6 onClick={()=>naviagte(`/product/${props.shoes.id}`)} className='cursor'>{props.shoes.maker}</h6>
            <h4 onClick={()=>naviagte(`/product/${props.shoes.id}`)} className='cursor'>{props.shoes.title}</h4>
            <h6 style={{fontWeight:'bold'}} onClick={()=>naviagte(`/product/${props.shoes.id}`)} className='cursor'>{props.shoes.price}원</h6>
            </div>
          </div>

          </>
    )
  }


  // Shoesitem2 컴포넌트에 getData 함수 추가


  export {Shoesitem0} ;