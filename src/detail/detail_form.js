import "./css/detail_form.css";
import Footer from "../common/footer.js";
import Detail_header from "../common/detail_header.js";
import Detail_img from "./detail_img.js";
import Detail_info from "./detail_info.js";
import Detail_size from "./detail_size.js";
import { useContext, useEffect, useState } from "react";
import Detail_shoes from "./detail_shoes.js";
import Detail_shoes2 from "./detail_shoes2.js";
import Detail_shoes3 from "./detail_shoes3.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserAuthContext } from "../Auth/UserAuthContext.jsx";

const Detail_form = () => {
  const axiosBaseURL = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, // 이 부분 추가
  });

  let [final_size, setFinal_Size] = useState("모든 사이즈");
  const { id } = useParams();

  let [main_info_shoes, setMain_info_shoes] = useState([]);
  let [detail_shoes_id, setDetail_shoes_id] = useState();
  let [mainImageUrls, setMainImageUrls] = useState([]);
  let [linked_img, setLinked_img] = useState([]);

  const { userId, isInitialized } = useContext(UserAuthContext);

  useEffect(() => {
    // axios.get(`http://192.168.42.142:3001/products/${id}`)
    if (isInitialized) {
      logUserInteraction();
    }
  }, [isInitialized]);

  useEffect(() => {
    axiosBaseURL
      .get(`http://192.168.42.142:3001/products/${id}`)
      .then((data) => {
        if (data.data && data.data.length > 0) {
          console.log("data1 : ", data.data[0].imgName);
          setMain_info_shoes(data.data[0]);
          setDetail_shoes_id(data.data[0].prid);
          setLinked_img(data.data[0].linkedImgName);

          const rawImgName = data.data[0].imgName;
          let cleanedImgName = rawImgName;
          if (rawImgName.startsWith("['") && rawImgName.endsWith("']")) {
            cleanedImgName = rawImgName.substring(2, rawImgName.length - 2);
          }
          const imgNameArray = cleanedImgName.split("', '");
          const imageUrls = imgNameArray.map((imgName) => {
            return `http://192.168.42.142:3001/admin/products/files/${imgName}`;
          });

          const rawLinkedImgName = data.data[0].linkedImgName;
          let cleanedLinkedImgName = rawLinkedImgName;
          if (rawLinkedImgName.startsWith("['") && rawLinkedImgName.endsWith("']")) {
            cleanedLinkedImgName = rawLinkedImgName.substring(2, rawLinkedImgName.length - 2);
          }
          const linkedImgNameArray = cleanedLinkedImgName.split("', '");
          const linkedImageUrls = linkedImgNameArray.map((linkedImgName) => {
            return `http://192.168.42.142:3001/admin/products/files/${linkedImgName}`;
          });

          if (imageUrls) {
            
            console.log("안녕", imageUrls)
          }
          setMainImageUrls(imageUrls);
          setLinked_img(linkedImageUrls);
          // console.log("ㅋㅋ : ", linkedImgNameArray[0])
          // console.log("ㅋㅋㅋ : ", linkedImgNameArray)
          
        } else {
          console.log("데이터가 비어 있음");
        }
      })
      .catch((error) => {
        console.log("실패함", error);
      });
  }, [id]);

  const logUserInteraction = () => {
    if (userId) {
      axios
        .post("http://localhost:3001/Access/logUserInteraction", null, {
          params: {
            userId: userId,
            productId: id,
          },
        })
        .then((response) => {
          console.log("User interaction logged successfully");
        })
        .catch((error) => {
          console.error("Error logging user interaction:", error);
        });
    } else {
      console.error("User not authenticated");
    }
  };

  return (
    <>
      <div className="body1">
        <Detail_header
          detail_main_image={mainImageUrls[0]}
          main_info_shoes={main_info_shoes}
          final_size={final_size}
          setFinal_Size={setFinal_Size}
        ></Detail_header>
        <div className="detail_container">
          <Detail_img linked_img={linked_img} detail_main_image={mainImageUrls}></Detail_img>
          <div
            style={{
              height: "1680px",
              width: "1px",
              marginLeft: "40px",
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
          ></div>
          <Detail_info
            detail_main_image={mainImageUrls[0]}
            main_info_shoes={main_info_shoes}
            final_size={final_size}
            setFinal_Size={setFinal_Size}
            className="detail_info"
          ></Detail_info>
        </div>
        <div className="detail_cotainer2">
          <Detail_shoes></Detail_shoes>
        </div>
        <div className="detail_container3">
          <Detail_size></Detail_size>
        </div>
        <div className="detail_container4">
          <Detail_shoes2 detail_shoes_id={detail_shoes_id}></Detail_shoes2>
        </div>
        <div className="detail_container4">
          <Detail_shoes3 detail_shoes_id={detail_shoes_id}></Detail_shoes3>
        </div>
        <div style={{ height: "50px" }}></div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Detail_form;
