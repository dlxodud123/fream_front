// Board_form.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardForm.css';
import Footer from "../common/footer";
import MainHeader from '../common/main_header';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Board_form({ addBoardItem, boardList = [] }) {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState('<p>Hello from CKEditor 5!</p>');
  const [imageFiles, setImageFiles] = useState([]);

  const handleSave = async () => {
    const formData = new FormData();

    // Append image files to formData
    imageFiles.forEach((file, index) => {
      formData.append(`image_${index}`, file);
    });

    // Add editor data
    formData.append('content', editorData);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Save successful', result);
    } catch (error) {
      console.error('Error saving content', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    const userId = boardList.length > 0 ? boardList[0].User_id : 'default_user_id';

    // boardList에서 가장 큰 No 값을 찾습니다.
    const maxNo = boardList.length > 0 ? Math.max(...boardList.map(item => item.No)) : 0;

    const newItem = {
      No: maxNo + 1, // 가장 큰 No 값에 1을 더합니다.
      제목: title,
      User_id: userId,
      작성시간: new Date().toLocaleString(),
      content: editorData,
      file: selectedFile,
    };

    addBoardItem(newItem);
    navigate("/board");
  };

  return (
    <>
      

      <div style={{ paddingTop: '50px' }}></div>
      <div className="board_form_container">
        <h1>글작성</h1>
        <div className="form_group">
          <label htmlFor="title">작성자</label>
          <div>
            {boardList.length > 0 ? <h4>{boardList[0].User_id}</h4> : <h4>default_user_id</h4>}
          </div>
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
                uploadUrl: '', // 커스텀 업로드 어댑터를 사용하므로 여기를 비웁니다.
              },
              toolbar: [
                'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote',
                'insertTable', 'mediaEmbed', 'undo', 'redo', 'imageUpload'
              ]
            }}
            onReady={editor => {
              console.log('Editor is ready to use!', editor);

              // Add custom upload adapter
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
          <button className="submit_button" onClick={handleSubmit}>제출</button>
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

  // Starts the upload process.
  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          // Add the file to the imageFiles state
          this.setImageFiles(prev => [...prev, file]);

          // Resolve with the file data
          resolve({ default: reader.result });
        };

        reader.onerror = err => reject(err);
        reader.onabort = () => reject();

        reader.readAsDataURL(file);
      }));
  }

  // Aborts the upload process.
  abort() {
    // Reject the promise returned from upload() method.
  }
}

export default Board_form;
