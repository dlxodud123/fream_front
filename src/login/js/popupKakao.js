
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
console.log('Code in popup:', code);

if (window.opener && !window.opener.closed) {
    window.opener.postMessage({ code: code }, '/api');
    console.log('Posted message to parent window.');
    window.close();
  } else {
    console.error('No !!!!!!!!!!!!');
  }