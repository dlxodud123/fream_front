import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  FormGroup,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../header";
import { tokens } from "../../theme";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

// 폼 데이터 초기화
const initialValues = {
  nameKor: "",
  nameEng: "",
  category: "",
  brand: "",
  color: "",
  gender: "",
  price: 0,
  info: "",
  mainImage: null,
  subImages: [],
};

const brandList = [
  "Adidas",
  "Oofos",
  "Dr.Martens",
  "UGG",
  "Alexander",
  "Keen",
  "Crocs",
  "Vans",
  "Nike",
  "Hermes",
  "Fila",
  "New Balance",
  "Salomon",
  "OOFOS",
  "Chloe",
  "Asics",
  "Timberland",
  "Jordan",
  "TawToe",
  "Hoka",
  "Birkenstock",
];

const colorList = [
  "Beige",
  "Black",
  "Blue",
  "Brown",
  "Gold",
  "Green",
  "Grey",
  "Navy",
  "Orange",
  "Pink",
  "Purple",
  "Red",
  "Silver",
  "White",
  "Yellow",
];

const checkoutSchema = yup.object().shape({
  nameKor: yup.string().required("한글 이름을 입력해주세요."),
  nameEng: yup.string().required("영문 이름을 입력해주세요."),
  category: yup
    .string()
    .oneOf(["Shoes", "Tops", "Bottoms"])
    .required("카테고리를 선택해주세요."),
  color: yup
    .string()
    .matches(/^(?:\w+(?:,\s*\w+)*)?$/, "올바른 형식의 색상을 입력해주세요."),
  gender: yup
    .string()
    .oneOf(["MAN", "WOMEN", "UNISEX"])
    .required("성별을 선택해주세요."),
  brand: yup.string().required("브랜드를 선택해주세요."),
  price: yup.number().required("가격을 입력해주세요.").positive().integer(),
  info: yup.string(),
  mainImage: yup.mixed().required("대표 이미지를 업로드해주세요."),
  subImages: yup
    .array()
    .of(yup.mixed())
    .max(4, "서브 이미지는 최대 4개까지 업로드할 수 있습니다."),
});

const AdminForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [previewMainImage, setPreviewMainImage] = useState(null);
  const [previewSubImages, setPreviewSubImages] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    if (id) {
      const fetchProductData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/admin/products/${id}`
          );
          const data = response.data;
          setProductData(data);
          setSelectedColors(data.color ? data.color.split(", ") : []);

          //
          setReadOnly(true); // 폼을 읽기 전용으로 설정
          console.log("응답 데이터:", response.data);
          // if (response.data.productImgs) {
          //   setPreviewMainImage(
          //     `http://localhost:3001/admin/products/files/${response.data.productImgs[0].imgName}`
          //   );
          // }
          // if (response.data.subImages && response.data.subImages.length > 0) {
          //   setPreviewSubImages(
          //     response.data.subImages.map(
          //       (img) => `http://localhost:3001/admin/products/files/${img}`
          //     )
          //   );
          // }
          if (data.productImgs && data.productImgs.length > 0) {
            setPreviewMainImage(
              `http://localhost:3001/admin/products/files/${data.productImgs[0].imgName}`
            );
            const subImageUrls = data.productImgs
              .slice(1, 5)
              .map(
                (img) =>
                  `http://localhost:3001/admin/products/files/${img.imgName}`
              );
            setPreviewSubImages(subImageUrls);
          }
        } catch (error) {
          console.error("Failed to fetch product data:", error);
        }
      };

      fetchProductData();
    }
  }, [id]);

  const handleFormSubmit = async (values) => {
    console.log("values:", values);
    const formData = new FormData();
    for (let key in values) {
      if (key !== "subImages" && key !== "mainImage") {
        formData.append(key, values[key]);
      }
    }

    formData.append("mainImage", values.mainImage);

    values.subImages.forEach((file) => {
      formData.append("subImages", file);
    });
    if (values.subImages.length === 0) {
      formData.append("subImages", []);
    }
    try {
      if (id) {
        // Update existing product

        const response = await axios.put(
          `http://localhost:3001/admin/products/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Product updated successfully:", response.data);
        setReadOnly(true);
        navigate(`/admin/products/${id}`);
      } else {
        // Create new product
        console.log(formData);
        const response = await axios.post(
          "http://localhost:3001/admin/products",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Product created successfully:", response.data);
        navigate(`/admin/products/${response.data.prid}`);
      }
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  const getInitialValues = () => {
    if (productData) {
      return {
        nameKor: productData.nameKor,
        nameEng: productData.nameEng,
        category: productData.category,
        brand: productData.brand,
        // color: productData.color ? productData.color.split(", ") : [],
        color: selectedColors.join(", "),
        gender: productData.gender,
        price: productData.price,
        info: productData.info,
        mainImage: null,
        subImages: [],
      };
    } else {
      return initialValues;
    }
  };

  const handleMainImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("mainImage", file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewMainImage(reader.result);
      };
    }
  };

  const handleSubImageChange = (event, setFieldValue, values) => {
    const files = event.target.files;
    // if (files) {
    //   const newImages = Array.from(files).map((file) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     return new Promise((resolve) => {
    //       reader.onloadend = () => {
    //         resolve({ file, url: reader.result });
    //       };
    //     });
    //   });
    if (files) {
      const newFiles = Array.from(files);
      const newImages = newFiles.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve({ file, url: reader.result });
          };
        });
      });

      Promise.all(newImages).then((images) => {
        const updatedImages = [
          ...previewSubImages,
          ...images.map((img) => img.url),
        ].slice(0, 4);
        setPreviewSubImages(updatedImages);
        // setFieldValue(
        //   "subImages",
        //   updatedImages.map((img) => img.file)
        // );
        setFieldValue(
          "subImages",
          [...values.subImages, ...newFiles].slice(0, 4)
        );
      });
    }
  };

  const handleColorFieldClick = () => {
    setColorModalOpen(true);
  };

  const handleColorSelect = (setFieldValue) => {
    setFieldValue("color", selectedColors.join(", "));
    setColorModalOpen(false);
  };

  const handleColorCancel = () => {
    setSelectedColors([]);
    setColorModalOpen(false);
  };

  const handleColorChange = (event) => {
    const { value, checked } = event.target;
    setSelectedColors((prevSelectedColors) =>
      checked
        ? [...prevSelectedColors, value]
        : prevSelectedColors.filter((color) => color !== value)
    );
  };

  return (
    <Box m="20px">
      <Header
        title={id ? "상품 수정" : "상품 생성"}
        subtitle={id ? "상품 정보를 수정하세요" : "새로운 상품을 등록하세요"}
      />
      <Formik
        initialValues={getInitialValues()}
        enableReinitialize={true}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
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
              {previewMainImage && (
                <Box display="flex" justifyContent="center" mb={2}>
                  <img
                    src={previewMainImage}
                    alt="Main Preview"
                    style={{
                      width: "300px",
                      height: "300px",
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              )}
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="main-image-upload"
                type="file"
                onChange={(event) =>
                  handleMainImageChange(event, setFieldValue)
                }
                disabled={readOnly}
              />
            </Box>
            <Box display="flex" justifyContent="center" marginBottom={"10px"}>
              <label htmlFor="main-image-upload">
                <Button
                  variant="contained"
                  component="span"
                  sx={{ backgroundColor: colors.blueAccent[700] }}
                  disabled={readOnly}
                  startIcon={<AddPhotoAlternateIcon />}
                >
                  대표 이미지 추가
                </Button>
              </label>
            </Box>
            <Box display="flex" justifyContent="center" mb={2} flexWrap="wrap">
              {previewSubImages.map((src, index) => (
                <Box key={index} sx={{ ml: index === 0 ? 0 : 1 }}>
                  <img
                    src={src}
                    alt={`Sub Preview ${index}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "4px",
                      marginRight: "10px",
                    }}
                  />
                </Box>
              ))}
              {previewSubImages.length < 4 && (
                <>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="sub-image-upload"
                    type="file"
                    multiple
                    onChange={(event) =>
                      handleSubImageChange(event, setFieldValue, values)
                    }
                    disabled={readOnly || previewSubImages.length >= 4}
                  />
                  <label htmlFor="sub-image-upload">
                    <Button
                      variant="contained"
                      component="span"
                      sx={{ backgroundColor: colors.blueAccent[700] }}
                      disabled={readOnly || previewSubImages.length >= 4}
                      startIcon={<AddPhotoAlternateIcon />}
                    >
                      서브 이미지 추가
                    </Button>
                  </label>
                </>
              )}
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
                label="상품명(한글)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nameKor}
                name="nameKor"
                error={!!touched.nameKor && !!errors.nameKor}
                helperText={touched.nameKor && errors.nameKor}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  readOnly: readOnly,
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="상품명(영문)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nameEng}
                name="nameEng"
                error={!!touched.nameEng && !!errors.nameEng}
                helperText={touched.nameEng && errors.nameEng}
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
                <InputLabel>카테고리</InputLabel>
                <Select
                  label="카테고리"
                  value={values.category}
                  onChange={(event) => {
                    handleChange(event);
                    setFieldValue("brand", "");
                    setFieldValue("color", "");
                  }}
                  onBlur={handleBlur}
                  name="category"
                  error={!!touched.category && !!errors.category}
                  disabled={readOnly}
                >
                  <MenuItem value="Shoes">신발</MenuItem>
                  <MenuItem value="Tops">상의</MenuItem>
                  <MenuItem value="Bottoms">하의</MenuItem>
                </Select>
                {touched.category && errors.category && (
                  <Box color="red" mt={1}>
                    {errors.category}
                  </Box>
                )}
              </FormControl>

              {values.category === "Shoes" && (
                <>
                  <FormControl
                    fullWidth
                    variant="filled"
                    sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel>브랜드</InputLabel>
                    <Select
                      label="브랜드"
                      value={values.brand}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="brand"
                      error={!!touched.brand && !!errors.brand}
                      disabled={readOnly}
                    >
                      {brandList.map((brand) => (
                        <MenuItem key={brand} value={brand}>
                          {brand}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.brand && errors.brand && (
                      <Box color="red" mt={1}>
                        {errors.brand}
                      </Box>
                    )}
                  </FormControl>

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="색상"
                    onClick={handleColorFieldClick}
                    value={values.color}
                    name="color"
                    error={!!touched.color && !!errors.color}
                    helperText={touched.color && errors.color}
                    sx={{ gridColumn: "span 4" }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </>
              )}

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel>성별</InputLabel>
                <Select
                  label="성별"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="gender"
                  error={!!touched.gender && !!errors.gender}
                  disabled={readOnly}
                >
                  <MenuItem value="MAN">남자</MenuItem>
                  <MenuItem value="WOMEN">여자</MenuItem>
                  <MenuItem value="UNISEX">공용</MenuItem>
                </Select>
                {touched.gender && errors.gender && (
                  <Box color="red" mt={1}>
                    {errors.gender}
                  </Box>
                )}
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="가격"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  readOnly: readOnly,
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="상품 정보"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.info}
                name="info"
                error={!!touched.info && !!errors.info}
                helperText={touched.info && errors.info}
                sx={{ gridColumn: "span 4" }}
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
                    onClick={() => setReadOnly(false)}
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
                    onClick={() => navigate("/products")}
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
                      상품 수정
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
                      상품 등록
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => navigate("/products")}
                    sx={{
                      backgroundColor: colors.blueAccent[700],
                    }}
                  >
                    취소
                  </Button>
                </>
              )}
            </Box>

            {/* Color Selection Modal */}
            <Dialog open={colorModalOpen} onClose={handleColorCancel}>
              <DialogTitle>색상 선택</DialogTitle>
              <DialogContent>
                <FormGroup>
                  {colorList.map((color) => (
                    <FormControlLabel
                      key={color}
                      control={
                        <Checkbox
                          checked={selectedColors.includes(color)}
                          onChange={handleColorChange}
                          value={color}
                        />
                      }
                      label={color}
                    />
                  ))}
                </FormGroup>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleColorCancel}>취소</Button>
                <Button onClick={() => handleColorSelect(setFieldValue)}>
                  선택
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AdminForm;
