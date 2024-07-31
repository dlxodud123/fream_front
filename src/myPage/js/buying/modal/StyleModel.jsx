import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
`;

const ImagePreview = styled.img`
  width: 200px;
  height: 200px;
  margin: 10px 0;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

function StyleModal({ onClose, itemId }) {
  const [image, setImage] = useState(null);
  const[imageFile, setImageFile] = useState(null);
  const [content, setContent] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setImageFile(file); // 파일 객체 저장
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("productId", itemId);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile); // 이미지 파일 추가
    }
    // userId는 백엔드에서 토큰을 통해 추출됩니다.

    try {
      const response = await axios.post(
        "api/styles",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("저장 성공:", response.data);
      onClose();
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  const handleCancel = () => {
    setImage(null);
    setContent("");
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{itemId}:스타일 작성</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <ImagePreview src={image} alt="Uploaded" />}
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
        />
        <Button onClick={handleSave}>등록하기</Button>
        <Button onClick={handleCancel}>취소</Button>
      </ModalContent>
    </ModalOverlay>
  );
}

export default StyleModal;
