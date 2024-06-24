import "./css/detail_img.css";
import img from "./../img/img5.jpg";

const Detail_img = () => {
    return(
        <div className="detail_img_form">
            <div className="detail_img_container">
                <img style={{width:"560px", height:"560px"}} src={img} />
                

                <div className="detail_img_info">
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px", border:"1px solid black"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px"}}></img></a></div>
                </div>
            </div>
        </div>
    )
}

export default Detail_img;