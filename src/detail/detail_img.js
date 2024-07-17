import "./css/detail_img.css";
import img from "./../img/shoes-img/menshoes0.webp";
import { useEffect } from "react";

const Detail_img = (props) => {
  useEffect(() => {
    console.log("이미지 : " , props.detail_main_image);
  }, [props.detail_main_image])
  return (
    <div className="detail_img_form">
      <div className="detail_img_container">
        <img
          style={{
            width: "560px",
            height: "560px",
            backgroundColor: "#f4f4f4",
          }}
          src={props.detail_main_image}
          alt="Main Product"
        />

        <div className="detail_img_info">
          <div>
            <a href="/product">
              <img
                src={img}
                style={{
                  width: "62.85px",
                  height: "62.85px",
                  border: "1px solid black",
                  backgroundColor: "#f4f4f4",
                }}
              ></img>
            </a>
          </div>
          <div>
            <a href="/product">
              <img
                src={img}
                style={{
                  width: "62.85px",
                  height: "62.85px",
                  backgroundColor: "#f4f4f4",
                }}
              ></img>
            </a>
          </div>
          <div>
            <a href="/product">
              <img
                src={img}
                style={{
                  width: "62.85px",
                  height: "62.85px",
                  backgroundColor: "#f4f4f4",
                }}
              ></img>
            </a>
          </div>
          <div>
            <a href="/product">
              <img
                src={img}
                style={{
                  width: "62.85px",
                  height: "62.85px",
                  backgroundColor: "#f4f4f4",
                }}
              ></img>
            </a>
          </div>
          <div>
            <a href="/product">
              <img
                src={img}
                style={{
                  width: "62.85px",
                  height: "62.85px",
                  backgroundColor: "#f4f4f4",
                }}
              ></img>
            </a>
          </div>
          <div>
            <a href="/product">
              <img
                src={img}
                style={{
                  width: "62.85px",
                  height: "62.85px",
                  backgroundColor: "#f4f4f4",
                }}
              ></img>
            </a>
          </div>
          <div>
            <a href="/product">
              <img
                src={img}
                style={{
                  width: "62.85px",
                  height: "62.85px",
                  backgroundColor: "#f4f4f4",
                }}
              ></img>
            </a>
          </div>
          <div>
            <a href="/product">
              <img
                src={img}
                style={{
                  width: "62.85px",
                  height: "62.85px",
                  backgroundColor: "#f4f4f4",
                }}
              ></img>
            </a>
          </div>
          <div>
            <a href="/product">
              <img
                src={img}
                style={{
                  width: "62.85px",
                  height: "62.85px",
                  backgroundColor: "#f4f4f4",
                }}
              ></img>
            </a>
          </div>
          <div>
            <a href="/product">
              <img
                src={img}
                style={{
                  width: "62.85px",
                  height: "62.85px",
                  backgroundColor: "#f4f4f4",
                }}
              ></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail_img;
