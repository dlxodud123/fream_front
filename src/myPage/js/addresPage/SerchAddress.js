import { useEffect, useCallback } from 'react';

function DaumAddress({ onClose, setPostalCode, setCity }) {
  const openPostcodeWindow = useCallback(() => {
    if (typeof window.daum !== 'undefined') {
      new window.daum.Postcode({
        oncomplete: (data) => {
          let fullAddress = ''; // 주소 변수
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            fullAddress = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
            fullAddress = data.jibunAddress;
          }

          // 도로명 주소일 경우만 추가 주소 처리
          if (data.userSelectedType === 'R') {
            let extraAddr = '';
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
              extraAddr += (extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            if (extraAddr !== '') {
              fullAddress += ` (${extraAddr})`;
            }
          }

          setPostalCode(data.zonecode);
          setCity(fullAddress);
          onClose();
        },
      }).open();
    }
  }, [onClose, setPostalCode, setCity]);

  useEffect(() => {
    openPostcodeWindow();
  }, [openPostcodeWindow]);

  return null;
}

export default DaumAddress;

