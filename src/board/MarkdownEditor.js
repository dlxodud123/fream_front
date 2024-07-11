import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownEditor from './board_form'; // 경로에 맞게 조정

ReactDOM.render(
  <React.StrictMode>
    <MarkdownEditor />
  </React.StrictMode>,
  document.getElementById('root')
);
