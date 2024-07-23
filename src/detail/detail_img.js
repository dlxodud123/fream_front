import "./css/detail_img.css";
import img from "./../img/shoes-img/menshoes0.webp";
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

const Detail_img = (props) => {
  useEffect(() => {
    // console.log("이미지 : " , props.detail_main_image[0]);
    // console.log("이미지 : " , props.detail_main_image[1]);
    // console.log("이미지 : " , props.detail_main_image[2]);
    console.log("asdf", props.linked_img);
    console.log("asdfasdf", props.detail_main_image);
  }, [props.detail_main_image, props.detail_linked_images]);

  // let [chooseImg, setChooseImg] = useState();

  return (
    <div className="detail_img_form">
      <div className="detail_img_container">
        <Carousel interval={null} className="custom-carousel">
          {props.detail_main_image.map((img, i) => (
            <Carousel.Item>
              <img
                src={img}
                style={{
                  width: "560px",
                  height: "560px",
                  objectFit: "cover",
                  backgroundColor: "#f4f4f4",
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="detail_img_info">
          {props.detail_linked_images &&
          props.detail_linked_images.length > 0 ? (
            props.detail_linked_images.map((linkedImage, index) => (
              <img
                key={index}
                style={{
                  width: "62.85px",
                  height: "62.85px",
                  backgroundColor: "#f4f4f4",
                }}
                src={linkedImage}
                alt={`linked-${index}`}
              />
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail_img;
