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

const axiosBaseURL = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // 이 부분 추가
});

const Detail_form = () => {
  let [final_size, setFinal_Size] = useState("모든 사이즈");
  const { id } = useParams();

  let [main_info_shoes, setMain_info_shoes] = useState([]);
  let [detail_shoes_id, setDetail_shoes_id] = useState();
  let [mainImageUrls, setMainImageUrls] = useState([]);
  let [linkedImageUrls, setLinkedImageUrls] = useState([]);

  const { userId, isInitialized } = useContext(UserAuthContext);

  useEffect(() => {
    // axios.get(`http://192.168.42.142:3001/products/${id}`)
    if (isInitialized) {
      logUserInteraction();
    }
  }, [isInitialized]);

  useEffect(() => {
    axiosBaseURL
      .get(`/api/products/${id}`)
      .then((data) => {
        console.log("data:", data);
        if (data.data && data.data.length > 0) {
          console.log("data1 : ", data.data[0].imgName);
          setMain_info_shoes(data.data[0]);
          setDetail_shoes_id(data.data[0].prid);
          // setLinked_img(data.data[0].linkedImgName);

          console.log(data.data[0].imgName);
          console.log(data.data[0].linkedImgName);

          const rawImgName = data.data[0].imgName;

          let cleanedImgName = rawImgName;

          if (rawImgName.startsWith("['") && rawImgName.endsWith("']")) {
            cleanedImgName = rawImgName.substring(2, rawImgName.length - 2);
          }

          const imgNameArray = cleanedImgName.split("', '");
          const imageUrls = imgNameArray.map((imgName) => {
            return `/api/admin/products/files/${imgName}`;
          });
          setMainImageUrls(imageUrls);

          if (data.data[0].linkedImgName) {
            const rawlinkedImgName = data.data[0].linkedImgName;
            let cleanedlinkedImgName = rawlinkedImgName;
            if (
              rawlinkedImgName.startsWith("['") &&
              rawlinkedImgName.endsWith("']")
            ) {
              cleanedlinkedImgName = rawlinkedImgName.substring(
                2,
                rawlinkedImgName.length - 2
              );
            }
            const linkedimgNameArray = cleanedlinkedImgName.split("', '");
            const linkedimageUrls = linkedimgNameArray.map((imgName) => {
              return `/api/admin/products/linkedfiles/${imgName}`;
            });
            setLinkedImageUrls(linkedimageUrls);
          }
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
        .post("/api/Access/logUserInteraction", null, {
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
          detail_main_image={mainImageUrls}
          main_info_shoes={main_info_shoes}
          final_size={final_size}
          setFinal_Size={setFinal_Size}
        ></Detail_header>
        <div className="detail_container">
          {/* <Detail_img detail_main_image={main_info_shoes.imgName}></Detail_img> */}
          <Detail_img
            detail_main_image={mainImageUrls}
            detail_linked_images={linkedImageUrls}
          ></Detail_img>

          <div
            style={{
              height: "1800px", //1680
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
            prid={id}
          ></Detail_info>
        </div>
        <div className="detail_cotainer2">
          <Detail_shoes></Detail_shoes>
        </div>
        <div className="detail_container3">
          <Detail_size></Detail_size>
        </div>
        <div className="detail_container4">
          <Detail_shoes2 id={id}></Detail_shoes2>
        </div>
        <div className="detail_container4">
          <Detail_shoes3 id={id}></Detail_shoes3>
        </div>
        <div style={{ height: "50px" }}></div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Detail_form;
