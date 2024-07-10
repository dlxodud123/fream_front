import React, { useEffect, useState } from 'react';

const Detail_Chart = () => {

  let [data, setDate] = useState();


  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;

    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const asdf = () => {
    // 스크립트 로드 후에 다음 우편번호 서비스를 초기화
    new window.daum.Postcode({
      oncomplete: function(data) {
        console.log(data); 
        console.log(typeof data);
        
        setDate(data);
      }
    }).open();
  };

  return (
    <div>
      <button onClick={() => asdf()}>asdf</button>
      <div id="postcode-container"></div>
      {data && (
        <div>
          <p>{data[0]}</p>
          <p>우편번호: {data.zonecode}</p>
          <p>주소: {data.address}</p>
          {/* 필요한 데이터를 추가적으로 표시 */}
        </div>
      )}
    </div>
  );
};

export default Detail_Chart;
