import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BoardForm.css";
import Footer from "../common/footer";
import MainHeader from "../common/main_header";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { UserAuthContext } from "../Auth/UserAuthContext";
import axios from "axios";

function BoardForm({ addBoardItem, boardList }) {
  const [title, setTitle] = useState("");
  const [editorData, setEditorData] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { userId, isInitialized, isLoggedIn } = useContext(UserAuthContext); // Context 사용

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      navigate("/login"); // 로그인되지 않은 경우 로그인 페이지로 리디렉션
    }
  }, [isInitialized, isLoggedIn, navigate]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    // const newPost = {
    //   No: boardList.length + 1,
    //   User_id: '현재 사용자', // 실제 사용자 ID로 변경 필요
    //   제목: title,
    //   content: editorData,
    //   file: selectedFile,
    //   작성시간: new Date().toLocaleString(),
    // };

    // addBoardItem(newPost);
    // navigate(`/board/${newPost.No}`);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", editorData);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    formData.append("user", userId); // 현재 사용자 ID를 폼 데이터에 추가 // 실제 사용자 ID로 변경 필요
    try {
      const response = await axios.post(
        "/api/board",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const newPost = response.data;
        addBoardItem(newPost);
        navigate(`/board/${newPost.boardId}`);
      } else {
        console.error("Failed to create new post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div style={{ paddingTop: "50px" }}></div>
      <div className="board_form_container">
        <h1>글 작성</h1>
        <div className="form_group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            config={{
              language: "en",
              simpleUpload: {
                uploadUrl: "",
              },
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "insertTable",
                "mediaEmbed",
                "undo",
                "redo",
                "imageUpload",
              ],
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data);
            }}
          />
        </div>
        <div className="form_group" style={{ marginTop: "50px" }}>
          <label htmlFor="file">사진 첨부</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
          />
          {selectedFile && <p>첨부된 파일: {selectedFile.name}</p>}
        </div>
        <div className="form_buttons">
          <button className="submit_button" onClick={handleSubmit}>
            작성 완료
          </button>
          <button className="cancel_button" onClick={() => navigate("/board")}>
            취소
          </button>
        </div>
      </div>
    </>
  );
}

export default BoardForm;
