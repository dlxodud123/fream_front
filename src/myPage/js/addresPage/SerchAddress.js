import { useEffect } from 'react';

function DaumAddress({ onClose, setPostcode, setAddress }){

    useEffect(() => {
        if (typeof window.daum !== 'undefined') {
          new window.daum.Postcode({
            oncomplete: (data) => {
                let fullAddress = ''; // 주소 변수
                let extraAddr = ''; // 참고항목 변수
                
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                  fullAddress = data.roadAddress;
                  console.log(fullAddress)
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                  fullAddress = data.jibunAddress;
                  console.log(fullAddress)
                }
      
                // 도로명 주소일 경우만 추가 주소 처리
                if (data.userSelectedType === 'R') {
                  if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                    console.log(extraAddr)
                    console.log(data.bname)
                    console.log("===============")
                  }
                  if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName);
                    console.log(extraAddr)
                    console.log(data.buildingName)
                    console.log(data.apartment)
                }
                  if (extraAddr !== '') {
                    extraAddr = ` (${extraAddr})`;
                  }
                  
                } 
      
                setPostcode(data.zonecode); // 우편번호 설정
                setAddress(fullAddress); // 주소 설정
                onClose(); // 창 닫기
              console.log(data);
            },
          }).open();
        }
      }, [onClose, setPostcode, setAddress]);

    return(
        {}
    )
}

export default DaumAddress;