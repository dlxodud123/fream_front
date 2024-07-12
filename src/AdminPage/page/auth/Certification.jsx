import React from "react";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

const { Item } = Form;

function Certification() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  function handleSubmit(values) {
    /* 가맹점 식별코드 */
    const userCode = "imp10391932";
    /* 결제 데이터 */
    const { merchant_uid, name, phone, min_age } = values;

    const data = {
      merchant_uid,
    };

    if (name) {
      data.name = name;
    }
    if (phone) {
      data.phone = phone;
    }
    if (min_age) {
      data.min_age = min_age;
    }

    /* 웹 환경일때 */
    const { IMP } = window;
    IMP.init(userCode);
    IMP.certification(data, callback);
  }

  /* 본인인증 후 콜백함수 */
  function callback(response) {
    const query = queryString.stringify(response);
    navigate(`/certification/result?${query}`);
  }

  return (
    <Wrapper>
      <Header>아임포트 본인인증 테스트</Header>
      <FormContainer form={form} onFinish={handleSubmit}>
        <Item
          name="merchant_uid"
          initialValue={`min_${new Date().getTime()}`}
          rules={[{ required: true, message: "주문번호는 필수입력입니다" }]}
        >
          <Input size="large" addonBefore="주문번호" />
        </Item>
        <Item name="name">
          <Input size="large" addonBefore="이름" />
        </Item>
        <Item name="phone">
          <Input size="large" type="number" addonBefore="전화번호" />
        </Item>
        <Item name="min_age">
          <Input
            size="large"
            type="number"
            addonBefore="최소연령"
            placeholder="허용 최소 만 나이"
          />
        </Item>
        <Button type="primary" htmlType="submit" size="large">
          본인인증하기
        </Button>
      </FormContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 7rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Header = styled.div`
  font-weight: bold;
  text-align: center;
  padding: 2rem;
  padding-top: 0;
  font-size: 3rem;
`;

const FormContainer = styled(Form)`
  width: 350px;
  border-radius: 3px;

  .ant-row {
    margin-bottom: 1rem;
  }
  .ant-form-item {
    display: flex;
    align-items: center;
  }
  .ant-col.ant-form-item-label > label::after {
    display: none;
  }

  .ant-form-explain {
    margin-top: 0.5rem;
    margin-left: 9rem;
  }

  .ant-input-group-addon:first-child {
    width: 9rem;
    text-align: left;
    color: #888;
    font-size: 1.2rem;
    border: none;
    background-color: inherit;
  }
  .ant-input-group > .ant-input:last-child {
    border-radius: 4px;
  }

  .ant-col {
    width: 100%;
  }

  button[type="submit"] {
    width: 100%;
    height: 5rem;
    font-size: 1.6rem;
    margin-top: 2rem;
  }
`;

export default Certification;
