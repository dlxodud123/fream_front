import React, { useEffect } from "react";

const DaumPostcode = ({ onComplete }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          onComplete(data);
        },
      }).open();
    };
    document.body.appendChild(script);
  }, [onComplete]);

  return null;
};

export default DaumPostcode;
