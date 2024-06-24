

function Womenshoes(props){
  
    return(
        <>
      <div style={{textAlign:"center"}} className="col-md-4">
         <img className="img-a-1" src={props.womenshoes.img}/>
        <h6>{props.womenshoes.maker}</h6>
        <h4>{props.womenshoes.title}</h4>
        <h6>{props.womenshoes.price}</h6>
      </div>
        
          </>
    )
  }


  // Shoesitem2 컴포넌트에 getData 함수 추가


  export default Womenshoes;