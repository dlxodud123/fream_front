import {useNavigate } from 'react-router-dom';

function Shoesitem0(props){
    console.log(props.shoes)
    const naviagte = useNavigate();
    return(
        <>
          <div style={{textAlign:"center"}} className="col-md-4">
            <img onClick={{naviagte}} className="img-a-1" src={props.shoes.img}/>
            <h6>{props.shoes.maker}</h6>
            <h4>{props.shoes.title}</h4>
            <h6>{props.shoes.price}</h6>
          </div>

          </>
    )
  }


  // Shoesitem2 컴포넌트에 getData 함수 추가


  export {Shoesitem0} ;