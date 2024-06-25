import "./css/detail_img.css";
import img from "./../img/shoes-img/menshoes0.webp";


const Detail_img = () => {

    return(
        <div className="detail_img_form">
            <div className="detail_img_container">
                <img style={{width:"560px", height:"560px", backgroundColor:"#f4f4f4"}} src={img} />
                
                <div className="detail_img_info">
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px", border:"1px solid black", backgroundColor:"#f4f4f4"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px", backgroundColor:"#f4f4f4"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px", backgroundColor:"#f4f4f4"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px", backgroundColor:"#f4f4f4"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px", backgroundColor:"#f4f4f4"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px", backgroundColor:"#f4f4f4"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px", backgroundColor:"#f4f4f4"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px", backgroundColor:"#f4f4f4"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px", backgroundColor:"#f4f4f4"}}></img></a></div>
                    <div><a href="/product"><img src={img} style={{width:"62.85px", height:"62.85px", backgroundColor:"#f4f4f4"}}></img></a></div>
                </div>
            </div>
        </div>
    )
}

export default Detail_img;