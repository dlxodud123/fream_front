

function Menshoes(props){
  
    return(
        <>
      <div style={{textAlign:"center"}} className="col-md-4">
         <img style={{background:"#f4f4f4"}} className="img-a-1" src={props.menshoes.img}/>
        <h6>{props.menshoes.maker}</h6>
        <h4>{props.menshoes.title}</h4>
        <h6>{props.menshoes.price}</h6>
      </div>
        
          </>
    )
  }


  // Shoesitem2 컴포넌트에 getData 함수 추가


  export {Menshoes} ;