import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../header";
import { tokens } from "../../theme";

// 폼 데이터 초기화
const initialValues = {
  username: "",
  password: "",
  name: "",
  age: "",
  phoneNumber: "",
  email: "",
  address1: "",
  address2: "",
  accessLevel: "",
  role: "",
  status: "active",
  profilePicture: null,
  department: "",
  notes: "",
};

const phoneRegExp = /^((\+82-?)|0)?1[0-9]{1}-?[0-9]{3,4}-?[0-9]{4}$/;

const checkoutSchema = yup.object().shape({
  username: yup.string().required("사용자 이름을 입력해주세요."),
  password: yup.string().required("비밀번호를 입력해주세요."),
  name: yup.string().required("이름을 입력해주세요."),
  age: yup.number().required("나이를 입력해주세요.").positive().integer(),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("전화번호를 입력해주세요."),
  email: yup.string().email("Invalid email").required("이메일을 입력해주세요."),
  address1: yup.string(),
  address2: yup.string(),
  accessLevel: yup.string().required("접근 수준을 입력해주세요."),
  role: yup.string().required("역할을 입력해주세요."),
  status: yup.string(),
  profilePicture: yup.mixed(),
  department: yup.string(),
  notes: yup.string(),
});

const AdminForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "/adminPage/img/mainAdmin.png"
  );
  const [readOnly, setReadOnly] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    if (id) {
      const fetchAdminData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/adminPage/modifyAdmin/${id}`
          );
          setAdminData(response.data);
          setReadOnly(true); // 폼을 읽기 전용으로 설정
          if (response.data.profilePicture) {
            setPreviewImage(
              `http://localhost:3001/adminPage/files/${response.data.profilePicture}`
            );
          } else {
            switch (response.data.role) {
              case "mainAdmin":
                setPreviewImage("/adminPage/img/mainAdmin.png");
                break;
              case "subAdmin":
                setPreviewImage("/adminPage/img/subAdmin.png");
                break;
              case "seller":
                setPreviewImage("/adminPage/img/user.png");
                break;
              default:
                setPreviewImage("/adminPage/img/mainAdmin.png");
                break;
            }
          }
        } catch (error) {
          console.error("Failed to fetch admin data:", error);
        }
      };

      fetchAdminData();
    }
  }, [id]);

  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }

    if (values.profilePicture instanceof File) {
      formData.append("file", values.profilePicture);
    } else {
      formData.append("file", new Blob()); // 빈 Blob 객체를 추가하여 'file' 필드가 존재하도록 함
    }

    try {
      if (id) {
        // Update existing admin
        const response = await axios.put(
          `http://localhost:3001/adminPage/modifyAdmin/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Admin updated successfully:", response.data);
        setReadOnly(true);
        navigate(`/admin/modifyAdmin/${id}`);
      } else {
        // Create new admin
        const response = await axios.post(
          "http://localhost:3001/adminPage/createAdmin",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Admin created successfully:", response.data);
        navigate(`/admin/modifyAdmin/${id}`);
      }
    } catch (error) {
      console.error("Failed to save admin:", error);
    }
  };

  const getInitialValues = () => {
    if (adminData) {
      return {
        username: adminData.username,
        password: adminData.password,
        name: adminData.name,
        age: adminData.age,
        phoneNumber: adminData.phoneNumber,
        email: adminData.email,
        address1: `${adminData.address?.zipcode}, ${adminData.address?.city}`,
        address2: adminData.address?.street || "",
        accessLevel: adminData.accessLevel,
        role: adminData.role,
        status: adminData.status,
        profilePicture: adminData.profilePicture,
        department: adminData.department,
        notes: adminData.notes,
      };
    } else {
      return initialValues;
    }
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("profilePicture", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRoleChange = (event, setFieldValue) => {
    const selectedRole = event.target.value;
    setFieldValue("role", selectedRole);
    if (!adminData?.profilePicture) {
      switch (selectedRole) {
        case "mainAdmin":
          setPreviewImage("/adminPage/img/mainAdmin.png");
          break;
        case "subAdmin":
          setPreviewImage("/adminPage/img/subAdmin.png");
          break;
        case "seller":
          setPreviewImage("/adminPage/img/user.png");
          break;
        default:
          setPreviewImage("/adminPage/img/mainAdmin.png");
          break;
      }
    }
  };

  const handleComplete = (data, setFieldValue) => {
    setAddress1(`${data.zonecode}, ${data.roadAddress}`);
    setFieldValue("address1", `${data.zonecode}, ${data.roadAddress}`);
  };

  const handlePostcodeOpen = (setFieldValue) => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: (data) => handleComplete(data, setFieldValue),
      }).open();
    };
    document.body.appendChild(script);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setReadOnly(false);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    if (id) {
      setReadOnly(true);
    } else {
      navigate("/admin/users");
    }
  };

  return (
    <Box m="20px">
      <Header
        title={id ? "관리자 계정 수정" : "관리자 계정 생성"}
        subtitle={id ? "관리자 프로필 수정" : "관리자 프로필 생성"}
      />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={getInitialValues()}
        enableReinitialize={true}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" justifyContent="center" mb={2}>
              <img
                src={previewImage}
                alt="Profile"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
            </Box>

            <Box display="flex" justifyContent="center" mb={2}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="profile-picture-upload"
                type="file"
                onChange={(event) => handleImageChange(event, setFieldValue)}
                disabled={readOnly}
              />
              <label htmlFor="profile-picture-upload">
                <Button
                  variant="contained"
                  component="span"
                  sx={{ backgroundColor: colors.blueAccent[700] }}
                  disabled={readOnly}
                >
                  프로필 변경
                </Button>
              </label>
            </Box>

            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="사용자이름"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  readOnly: readOnly,
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="비밀번호"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  readOnly: readOnly,
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="이름"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  readOnly: readOnly,
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="나이"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  readOnly: readOnly,
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="전화번호"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  readOnly: readOnly,
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="이메일주소"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  readOnly: readOnly,
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="주소1"
                value={values.address1}
                name="address1"
                sx={{ gridColumn: "span 3" }}
                InputProps={{
                  readOnly: readOnly,
                }}
              />
              <Button
                variant="contained"
                onClick={() => handlePostcodeOpen(setFieldValue)}
                sx={{
                  gridColumn: "span 1",
                  backgroundColor: colors.blueAccent[700],
                }}
                disabled={readOnly}
              >
                주소 찾기
              </Button>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="주소2"
                value={values.address2}
                name="address2"
                onChange={(e) => setFieldValue("address2", e.target.value)}
                sx={{ gridColumn: "span 4" }}
                InputProps={{
                  readOnly: readOnly,
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="접근 권한"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.accessLevel}
                name="accessLevel"
                error={!!touched.accessLevel && !!errors.accessLevel}
                helperText={touched.accessLevel && errors.accessLevel}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  readOnly: readOnly,
                }}
              />

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel>Role</InputLabel>
                <Select
                  label="역할"
                  value={values.role}
                  onChange={(event) => handleRoleChange(event, setFieldValue)}
                  onBlur={handleBlur}
                  name="role"
                  error={!!touched.role && !!errors.role}
                  disabled={readOnly}
                >
                  <MenuItem value="mainAdmin">mainAdmin</MenuItem>
                  <MenuItem value="subAdmin">subAdmin</MenuItem>
                  <MenuItem value="seller">seller</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="상태"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name="status"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  readOnly: readOnly,
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="hidden"
                label="Profile Picture URL"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.profilePicture}
                name="profilePicture"
                error={!!touched.profilePicture && !!errors.profilePicture}
                helperText={touched.profilePicture && errors.profilePicture}
                sx={{ gridColumn: "span 2" }}
                style={{ display: "none" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="부서"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.department}
                name="department"
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  readOnly: readOnly,
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="특이사항"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.notes}
                name="notes"
                error={!!touched.notes && !!errors.notes}
                helperText={touched.notes && errors.notes}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  readOnly: readOnly,
                }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              {readOnly ? (
                <>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleEditClick}
                    sx={{
                      mr: 2,
                      backgroundColor: colors.blueAccent[700],
                    }}
                  >
                    수정하기
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleCancelClick}
                    sx={{
                      backgroundColor: colors.blueAccent[700],
                    }}
                  >
                    취소
                  </Button>
                </>
              ) : (
                <>
                  {id && (
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        mr: 2,
                        backgroundColor: colors.blueAccent[700],
                      }}
                    >
                      관리자 계정 수정
                    </Button>
                  )}
                  {!id && (
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        mr: 2,
                        backgroundColor: colors.blueAccent[700],
                      }}
                    >
                      관리자 계정 생성
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleCancelClick}
                    sx={{
                      backgroundColor: colors.blueAccent[700],
                    }}
                  >
                    취소
                  </Button>
                </>
              )}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AdminForm;
