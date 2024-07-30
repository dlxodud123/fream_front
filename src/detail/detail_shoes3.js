import "./css/detail_shoes3.css";
import React, { useEffect, useState } from "react";
import data from "../data/data.js";
import axios from "axios";

const Detail_shoes3 = (props) => {
  const axiosBaseURL = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, // 이 부분 추가
  });

  const [shoes, setShoes] = useState([]);
  // const [count, setCount] = useState(5);

  useEffect(() => {
    // console.log("성별 id", props.id);
    axiosBaseURL
      .get(`/api/products/${props.id}/gender`)
      .then((data) => {
        if (data.data && data.data.length > 0) {
          // console.log("성별 : ", data.data[0]);
          setShoes(data.data);
        } else {
          console.log("데이터가 비어 있음");
        }
      })
      .catch((error) => {
        console.log("실패함", error);
      });
  }, [props.id]);

  return (
    <div style={{ marginTop: "70px" }}>
      <div
        style={{
          marginLeft: "10px",
          marginBottom: "15px",
          fontWeight: "bold",
          fontSize: "22px",
        }}
      >
        성별 상품
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {shoes.map((shoes, i) => {
          const rawImgName = shoes.imgName;

          if (!rawImgName) {
            return null;
          }

          let cleanedImgName = rawImgName;

          if (rawImgName.startsWith("['") && rawImgName.endsWith("']")) {
            cleanedImgName = rawImgName.substring(2, rawImgName.length - 2);
          }

          const imgNameArray = cleanedImgName.split("', '");
          const imageUrls = imgNameArray.map((imgName) => {
            return `/api/admin/products/files/${imgName}`;
          });
          // console.log("이미지 : ", imageUrls[0]);

          return (
            <div key={shoes.id} style={{ boxSizing: "border-box" }}>
              <Shoesitem0 img={imageUrls[0]} shoes={shoes} i={i + 1} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US").format(price);
};

const detail_link = (prid) => {
  window.location.href = `/products/${prid}`;
};

const Shoesitem0 = (props) => {
  return (
    <div>
      <img
        onClick={() => detail_link(props.shoes.prid)}
        className="img"
        src={props.img}
      />
      <div
        onClick={() => detail_link(props.shoes.prid)}
        style={{ marginLeft: "10px", marginBottom: "30px", cursor: "pointer" }}
      >
        <div style={{ fontWeight: "bold" }}>{props.shoes.brand}</div>
        <div style={{ width: "220px" }}>{props.shoes.nameEng}</div>
        <div
          style={{ width: "220px", color: "rgba(0,0,0,0.3)", fontSize: "15px" }}
        >
          {props.shoes.nameKor}
        </div>
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
          {formatPrice(props.shoes.price)}원
        </div>
      </div>
    </div>
  );
};

export default Detail_shoes3;
