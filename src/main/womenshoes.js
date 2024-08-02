import styled from 'styled-components';

function Womenshoes(props){
  const imageUrl=`/api/admin/products/files/`+props.womenshoes.imgName;
  // const imageUrl=""
    return(
        <>
      <div style={{textAlign:"center"}} className="col-md-4">
         <img style={{background:"#f4f4f4"}} className="img-a-1" src={imageUrl}/>
        <h6>{props.womenshoes.brand}</h6>
        <h4>{props.womenshoes.nameKor}</h4>
        <h6>{props.womenshoes.price}</h6>
      </div>
        
          </>
    )
  }


  // Shoesitem2 컴포넌트에 getData 함수 추가


  export default Womenshoes;