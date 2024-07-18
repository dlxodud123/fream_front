import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BoardForm.css';
import Footer from "../common/footer";
import MainHeader from '../common/main_header';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";

function EditBoardForm({ boardList, updateBoardItem }) {
  const { No } = useParams();
  const post = boardList.find(post => post.No === Number(No));
  const [title, setTitle] = useState(post ? post.제목 : '');
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState(post ? post.content : '');
  const [imageFiles, setImageFiles] = useState([]);
  const [board, setBoard] = useState({});
  const [writer, setWriter] = useState("");

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.13:3001/board/${No}`
        );
        console.log(response.data);
        setBoard(response.data);
        setWriter(response.data.user.userId);
      } catch (error) {
        console.error("Failed to fetch board list:", error);
      }
    };

    fetchBoardList();
  }, [No]);
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setEditorData(post.content);
    }
  }, [post]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    const updatedItem = {
      ...post,
      제목: title,
      content: editorData,
      file: selectedFile,
    };

    updateBoardItem(updatedItem);
    navigate("/board");
  };

  return (
    <>
   
      <div style={{ paddingTop: '50px' }}></div>
      <div className="board_form_container">
        <h1>글수정</h1>
        <div className="form_group">
          <label htmlFor="title">작성자</label>
          <div>{writer}</div>
        </div>
        <div className="form_group">
          <label htmlFor="title">제목</label>
          <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            config={{
              language: 'en',
              simpleUpload: {
                uploadUrl: '',
              },
              toolbar: [
                'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote',
                'insertTable', 'mediaEmbed', 'undo', 'redo', 'imageUpload'
              ]
            }}
            onReady={editor => {
              // 업로드 어댑터 등록
              editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                return new MyUploadAdapter(loader, imageFiles, setImageFiles);
              };
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data);
            }}
          />
        </div>
        <div className="form_group" style={{ marginTop: '50px' }}>
          <label htmlFor="file">사진 첨부</label>
          <input type="file" id="file" name="file" onChange={handleFileChange} />
          {selectedFile && <p>첨부된 파일: {selectedFile.name}</p>}
        </div>
        <div className="form_buttons">
          <button className="submit_button" onClick={handleSubmit}>수정 완료</button>
          <button className="cancel_button" onClick={() => navigate("/board")}>취소</button>
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
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          this.setImageFiles(prev => [...prev, file]);
          resolve({ default: reader.result });
        };

        reader.onerror = err => reject(err);
        reader.onabort = () => reject();

        reader.readAsDataURL(file);
      }));
  }

  abort() {}
}

export default EditBoardForm;
