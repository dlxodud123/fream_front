import { Box, Button, TextField } from "@mui/material";
// Material-UI에서 Box, Button, TextField 컴포넌트를 가져옵니다.

import { Formik } from "formik";
// Formik 라이브러리에서 Formik 컴포넌트를 가져옵니다.

import * as yup from "yup";
// yup 라이브러리에서 모든 내용을 가져옵니다. 주로 유효성 검사 스키마를 작성하는 데 사용됩니다.

import useMediaQuery from "@mui/material/useMediaQuery";
// Material-UI에서 useMediaQuery 훅을 가져옵니다. 이 훅은 화면 크기에 따라 스타일을 적용하는 데 사용됩니다.

import Header from "../header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// 프로젝트의 Header 컴포넌트를 가져옵니다.

// 폼 데이터 초기화
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
  auth: "admin",
};
// 폼의 초기 값을 설정합니다.

const phoneRegExp = /^((\+82-?)|0)?1[0-9]{1}-?[0-9]{3,4}-?[0-9]{4}$/;
// 전화번호 형식을 확인하기 위한 정규 표현식을 정의합니다.

const checkoutSchema = yup.object().shape({
  //yup.object().shape는 유효성 검사 규칙을 설정할 때 사용하는 함수
  firstName: yup.string().required("이름을 입력해주세요."),
  // firstName 필드는 문자열이며 필수 항목입니다.

  lastName: yup.string().required("이름을 입력해주세요."),
  // lastName 필드는 문자열이며 필수 항목입니다.

  email: yup.string().email("invalid email").required("이메일을 입력해주세요."),
  // email 필드는 유효한 이메일 형식이어야 하며 필수 항목입니다.

  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid") //1차 에러
    .required("전화번호를 입력해주세요."), //2차에러로 이중 구조
  // contact 필드는 정규 표현식과 일치해야 하며 필수 항목입니다.

  address1: yup.string().required("주소를 입력해주세요."),
  // address1 필드는 문자열이며 필수 항목입니다.

  address2: yup.string().required("주소를 입력해주세요."),
  // address2 필드는 문자열이며 필수 항목입니다.
});

const ModifyAdmin = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // 화면의 너비가 600px 이상인 경우 true를 반환합니다.
  //ui크기가 600보다 작아지지 못하도록 css를 걸어준다.

  const handleFormSubmit = (values) => {
    console.log(values);
  }; //트리거 Form을 눌렀을 때 트리거로 동작하도록 Fatch나 xiose사용
  // 폼이 제출될 때 호출되는 함수로, 폼의 값을 콘솔에 출력합니다.
  const { id } = useParams();
  const [adminData, setAdminData] = useState(null);
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/adminPage/modifyAdmin/${id}`
        );
        setAdminData(response.data);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };

    fetchAdminData();
  }, [id]);

  return (
    <Box m="20px">
      <Header title="관리자 계정 생성" subtitle="관리자 프로필 생성" />
      {/* Header 컴포넌트를 사용하여 제목과 부제목을 설정합니다. */}

      <Formik
        onSubmit={handleFormSubmit}
        // 등록버튼 함수
        initialValues={initialValues}
        // 오브젝트 벨류로 생성
        validationSchema={checkoutSchema}
        // 폼의 유효성 검사 스키마를 설정합니다.
      >
        {({
          values, //각 필드의 벨류 객체를 통해 접근 가능하도록
          errors, //스키마 규칙에 따른 에러 확인
          touched, //폼 필드와 상호작용의 여부 추적
          handleBlur, //터치 상태를 업데이트하고 유효성 검사 트리거
          handleChange, //입력값이 변경될 때 호출되는 트리거
          handleSubmit, //폼의 유효성을 검사를 실행하고 서브밋함수를 호출 하기 위함
        }) => (
          //폼 안의 컴포넌트를 제어하기 위해 위의 옵션을 사용
          <form onSubmit={handleSubmit}>
            {/* 폼 제출 시 handleSubmit 함수를 호출합니다. */}
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              // 4개의 열을 반복하고 각 열의 최소 너비를 0으로 설정하고 1fr은 가용 공간을
              //다른 fr단위와 균등하게 나누는 단위로 사용
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* 폼 요소를 그리드 레이아웃으로 배치합니다. 화면 크기에 따라 그리드 컬럼을 설정합니다. */}
              <TextField
                fullWidth
                // 필드가 가로 전체 너비를 차지하도록 설정합니다.

                variant="filled"
                // TextField의 변형 스타일을 'filled'로 설정합니다. 이는 텍스트 필드가 채워진 배경을 가지도록 합니다.

                type="text"
                // 입력 필드의 타입을 텍스트로 설정합니다.

                label="First Name"
                // 입력 필드 위에 표시될 레이블 텍스트를 설정합니다.

                onBlur={handleBlur}
                // 입력 필드에서 포커스를 벗어날 때 호출되는 이벤트 핸들러를 설정합니다. Formik의 handleBlur 함수와 연결됩니다.

                onChange={handleChange}
                // 입력 필드의 값이 변경될 때 호출되는 이벤트 핸들러를 설정합니다. Formik의 handleChange 함수와 연결됩니다.

                value={values.firstName}
                // 입력 필드의 현재 값을 설정합니다. Formik의 values 객체에서 firstName 값을 가져옵니다.

                name="firstName"
                // 입력 필드의 이름을 설정합니다. 이는 Formik이 필드 값을 관리하는 데 사용됩니다.

                error={!!touched.firstName && !!errors.firstName}
                // 필드가 오류 상태인지 여부를 설정합니다. 필드가 터치되었고 오류가 있는 경우에만 true를 반환합니다.

                helperText={touched.firstName && errors.firstName}
                // 오류가 있는 경우, 오류 메시지를 표시하기 위한 텍스트를 설정합니다.

                sx={{ gridColumn: "span 2" }}
                // CSS-in-JS 스타일링을 위한 MUI의 sx prop을 사용하여 그리드 열을 span 2로 설정합니다. 즉, 필드가 두 개의 그리드 열을 차지하도록 합니다.
              />
              {/* First Name 필드 */}

              <TextField
                fullWidth
                // 필드가 가로 전체 너비를 차지하도록 설정합니다.

                variant="filled"
                // TextField의 변형 스타일을 'filled'로 설정합니다. 이는 텍스트 필드가 채워진 배경을 가지도록 합니다.

                type="text"
                // 입력 필드의 타입을 텍스트로 설정합니다.

                label="Last Name"
                // 입력 필드 위에 표시될 레이블 텍스트를 설정합니다.

                onBlur={handleBlur}
                // 입력 필드에서 포커스를 벗어날 때 호출되는 이벤트 핸들러를 설정합니다. Formik의 handleBlur 함수와 연결됩니다.

                onChange={handleChange}
                // 입력 필드의 값이 변경될 때 호출되는 이벤트 핸들러를 설정합니다. Formik의 handleChange 함수와 연결됩니다.

                value={values.lastName}
                // 입력 필드의 현재 값을 설정합니다. Formik의 values 객체에서 lastName 값을 가져옵니다.

                name="lastName"
                // 입력 필드의 이름을 설정합니다. 이는 Formik이 필드 값을 관리하는 데 사용됩니다.

                error={!!touched.lastName && !!errors.lastName}
                // 필드가 오류 상태인지 여부를 설정합니다. 필드가 터치되었고 오류가 있는 경우에만 true를 반환합니다.

                helperText={touched.lastName && errors.lastName}
                // 오류가 있는 경우, 오류 메시지를 표시하기 위한 텍스트를 설정합니다.

                sx={{ gridColumn: "span 2" }}
                // CSS-in-JS 스타일링을 위한 MUI의 sx prop을 사용하여 그리드 열을 span 2로 설정합니다. 즉, 필드가 두 개의 그리드 열을 차지하도록 합니다.
              />
              {/* Last Name 필드 */}

              <TextField
                fullWidth
                // 필드가 가로 전체 너비를 차지하도록 설정합니다.

                variant="filled"
                // TextField의 변형 스타일을 'filled'로 설정합니다. 이는 텍스트 필드가 채워진 배경을 가지도록 합니다.

                type="text"
                // 입력 필드의 타입을 텍스트로 설정합니다.

                label="Email"
                // 입력 필드 위에 표시될 레이블 텍스트를 설정합니다.

                onBlur={handleBlur}
                // 입력 필드에서 포커스를 벗어날 때 호출되는 이벤트 핸들러를 설정합니다. Formik의 handleBlur 함수와 연결됩니다.

                onChange={handleChange}
                // 입력 필드의 값이 변경될 때 호출되는 이벤트 핸들러를 설정합니다. Formik의 handleChange 함수와 연결됩니다.

                value={values.email}
                // 입력 필드의 현재 값을 설정합니다. Formik의 values 객체에서 email 값을 가져옵니다.

                name="email"
                // 입력 필드의 이름을 설정합니다. 이는 Formik이 필드 값을 관리하는 데 사용됩니다.

                error={!!touched.email && !!errors.email}
                // 필드가 오류 상태인지 여부를 설정합니다. 필드가 터치되었고 오류가 있는 경우에만 true를 반환합니다.

                helperText={touched.email && errors.email}
                // 오류가 있는 경우, 오류 메시지를 표시하기 위한 텍스트를 설정합니다.

                sx={{ gridColumn: "span 4" }}
                // CSS-in-JS 스타일링을 위한 MUI의 sx prop을 사용하여 그리드 열을 span 4로 설정합니다. 즉, 필드가 네 개의 그리드 열을 차지하도록 합니다.
              />
              {/* Email 필드 */}

              <TextField
                fullWidth
                // 필드가 가로 전체 너비를 차지하도록 설정합니다.

                variant="filled"
                // TextField의 변형 스타일을 'filled'로 설정합니다. 이는 텍스트 필드가 채워진 배경을 가지도록 합니다.

                type="text"
                // 입력 필드의 타입을 텍스트로 설정합니다.

                label="Contact Number"
                // 입력 필드 위에 표시될 레이블 텍스트를 설정합니다.

                onBlur={handleBlur}
                // 입력 필드에서 포커스를 벗어날 때 호출되는 이벤트 핸들러를 설정합니다. Formik의 handleBlur 함수와 연결됩니다.

                onChange={handleChange}
                // 입력 필드의 값이 변경될 때 호출되는 이벤트 핸들러를 설정합니다. Formik의 handleChange 함수와 연결됩니다.

                value={values.contact}
                // 입력 필드의 현재 값을 설정합니다. Formik의 values 객체에서 contact 값을 가져옵니다.

                name="contact"
                // 입력 필드의 이름을 설정합니다. 이는 Formik이 필드 값을 관리하는 데 사용됩니다.

                error={!!touched.contact && !!errors.contact}
                // 필드가 오류 상태인지 여부를 설정합니다. 필드가 터치되었고 오류가 있는 경우에만 true를 반환합니다.

                helperText={touched.contact && errors.contact}
                // 오류가 있는 경우, 오류 메시지를 표시하기 위한 텍스트를 설정합니다.

                sx={{ gridColumn: "span 4" }}
                // CSS-in-JS 스타일링을 위한 MUI의 sx prop을 사용하여 그리드 열을 span 4로 설정합니다. 즉, 필드가 네 개의 그리드 열을 차지하도록 합니다.
              />
              {/* Contact Number 필드 */}

              <TextField
                fullWidth
                // 필드가 가로 전체 너비를 차지하도록 설정합니다.

                variant="filled"
                // TextField의 변형 스타일을 'filled'로 설정합니다. 이는 텍스트 필드가 채워진 배경을 가지도록 합니다.

                type="text"
                // 입력 필드의 타입을 텍스트로 설정합니다.

                label="Address 1"
                // 입력 필드 위에 표시될 레이블 텍스트를 설정합니다.

                onBlur={handleBlur}
                // 입력 필드에서 포커스를 벗어날 때 호출되는 이벤트 핸들러를 설정합니다. Formik의 handleBlur 함수와 연결됩니다.

                onChange={handleChange}
                // 입력 필드의 값이 변경될 때 호출되는 이벤트 핸들러를 설정합니다. Formik의 handleChange 함수와 연결됩니다.

                value={values.address1}
                // 입력 필드의 현재 값을 설정합니다. Formik의 values 객체에서 address1 값을 가져옵니다.

                name="address1"
                // 입력 필드의 이름을 설정합니다. 이는 Formik이 필드 값을 관리하는 데 사용됩니다.

                error={!!touched.address1 && !!errors.address1}
                // 필드가 오류 상태인지 여부를 설정합니다. 필드가 터치되었고 오류가 있는 경우에만 true를 반환합니다.

                helperText={touched.address1 && errors.address1}
                // 오류가 있는 경우, 오류 메시지를 표시하기 위한 텍스트를 설정합니다.

                sx={{ gridColumn: "span 4" }}
                // CSS-in-JS 스타일링을 위한 MUI의 sx prop을 사용하여 그리드 열을 span 4로 설정합니다. 즉, 필드가 네 개의 그리드 열을 차지하도록 합니다.
              />
              {/* Address 1 필드 */}

              <TextField
                fullWidth
                // 필드가 가로 전체 너비를 차지하도록 설정합니다.

                variant="filled"
                // TextField의 변형 스타일을 'filled'로 설정합니다. 이는 텍스트 필드가 채워진 배경을 가지도록 합니다.

                type="text"
                // 입력 필드의 타입을 텍스트로 설정합니다.

                label="Address 2"
                // 입력 필드 위에 표시될 레이블 텍스트를 설정합니다.

                onBlur={handleBlur}
                // 입력 필드에서 포커스를 벗어날 때 호출되는 이벤트 핸들러를 설정합니다. Formik의 handleBlur 함수와 연결됩니다.

                onChange={handleChange}
                // 입력 필드의 값이 변경될 때 호출되는 이벤트 핸들러를 설정합니다. Formik의 handleChange 함수와 연결됩니다.

                value={values.address2}
                // 입력 필드의 현재 값을 설정합니다. Formik의 values 객체에서 address2 값을 가져옵니다.

                name="address2"
                // 입력 필드의 이름을 설정합니다. 이는 Formik이 필드 값을 관리하는 데 사용됩니다.

                error={!!touched.address2 && !!errors.address2}
                // 필드가 오류 상태인지 여부를 설정합니다. 필드가 터치되었고 오류가 있는 경우에만 true를 반환합니다.

                helperText={touched.address2 && errors.address2}
                // 오류가 있는 경우, 오류 메시지를 표시하기 위한 텍스트를 설정합니다.

                sx={{ gridColumn: "span 4" }}
                // CSS-in-JS 스타일링을 위한 MUI의 sx prop을 사용하여 그리드 열을 span 4로 설정합니다. 즉, 필드가 네 개의 그리드 열을 차지하도록 합니다.
              />
              {/* Address 2 필드 */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
              {/* 제출 버튼 */}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ModifyAdmin;
// Form 컴포넌트를 내보내어 다른 파일에서 사용할 수 있게 합니다.
