
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
console.log('코드 팝업 :', code);

if (window.opener && !window.opener.closed) {

  const parentOrigin = 'http://localhost:3000';
  
  window.opener.postMessage({ code: code }, parentOrigin);
  console.log('Posted message to parent window.');
  window.close();
} else {
  console.error('No !!!!!!!!!!!!');
}
