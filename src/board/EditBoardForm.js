import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BoardForm.css";
import Footer from "../common/footer";
import MainHeader from "../common/main_header";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

function EditBoardForm({ boardList, updateBoardItem }) {
  const { No } = useParams();
  const post = boardList.find((post) => post.No === Number(No));
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState(post ? post.content : "");
  const [imageFiles, setImageFiles] = useState([]);
  const [board, setBoard] = useState({});
  const [writer, setWriter] = useState("");

  const [title, setTitle] = useState(board ? board.title : "");

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const response = await axios.get(
          `/api/board/${No}`
        );

        console.log("응답데이터:", response.data);
        setTitle(response.data.title);
        setBoard(response.data);
        setWriter(response.data.user.userId);
      } catch (error) {
        console.error("Failed to fetch board list:", error);
      }
    };

    fetchBoardList();
  }, [No]);
//   useEffect(() => {
//     if (post) {
//       setTitle(post.title);
//       setEditorData(post.content);
//     }
//   }, [post]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", editorData);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    formData.append("user", writer); // 현재 사용자 ID를 폼 데이터에 추가 // 실제 사용자 ID로 변경 필요
    try {
      const response = await axios.put(
        `/api/board/${No}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const newPost = response.data;
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
        <h1>글수정</h1>
        <div className="form_group">
          <label htmlFor="title">작성자</label>
          <div>{writer}</div>
        </div>
        <div className="form_group">
          <label htmlFor="title">제목</label>

          <input
            type="text"
            id="title"
            name="title"
            value={board.title}
            onChange={(e) => setTitle(e.target.value)}
          />

        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={board.content}
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
            onReady={(editor) => {
              // 업로드 어댑터 등록
              editor.plugins.get("FileRepository").createUploadAdapter = (
                loader
              ) => {
                return new MyUploadAdapter(loader, imageFiles, setImageFiles);
              };
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
            수정 완료
          </button>
          <button className="cancel_button" onClick={() => navigate("/board")}>
            취소
          </button>
        </div>
      </div>
    </>
  );
}

class MyUploadAdapter {
  constructor(loader, imageFiles, setImageFiles) {
    this.loader = loader;
    this.imageFiles = imageFiles;
    this.setImageFiles = setImageFiles;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            this.setImageFiles((prev) => [...prev, file]);
            resolve({ default: reader.result });
          };

          reader.onerror = (err) => reject(err);
          reader.onabort = () => reject();

          reader.readAsDataURL(file);
        })
    );
  }

  abort() {}
}

export default EditBoardForm;
