

function Menshoes(props){
    const imageUrl=`/api/admin/products/files/`+props.menshoes.imgName;
    return(
        <>
      <div style={{textAlign:"center"}} className="col-md-4">
         <img style={{background:"#f4f4f4"}} className="img-a-1" src={imageUrl}/>
        <h6>{props.menshoes.brand}</h6>
        <h4>{props.menshoes.nameKor}</h4>
        <h6>{props.menshoes.price}원</h6>
      </div>
        
          </>
    )
  }


  // Shoesitem2 컴포넌트에 getData 함수 추가


  export {Menshoes} ;