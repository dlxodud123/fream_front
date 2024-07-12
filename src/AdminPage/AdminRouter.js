import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./page/dashboard/dashboard";
import Topbar from "./page/global/Topbar";
import Sidebar from "./page/global/sidebar";
import AdminUser from "./page/adminList/adminList";
import Calendar from "./page/adminList/calendar";
import "./admin.css";
import CreateAdmin from "./page/adminList/createAdmin";
import ModifyAdmin from "./page/adminList/modifyAdmin";
import AdminForm from "./page/adminList/AdminForm";
import { useAuth } from "./adminAccess/adminAccess";
import MemberUser from "./page/member/memberList";
import AccessBrowser from "./page/rate/AccessBrowser";
import AccessOs from "./page/rate/AccessOS";
import AccessReferer from "./page/rate/AccessReferer";
import SellerList from "./page/product/sellerList";
import ProductList from "./page/product/productList";
import DeliveryList from "./page/member/deliveryList";
import OrderList from "./page/member/orderList";
import ProductQnaList from "./page/product/InquiryProductList";
import Certification from "./page/auth/Certification";
import CertificationResult from "./page/auth/CertificationResult";
import ProductForm from "./page/product/ProductForm";
function AdminRouter() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { adminAccess } = useAuth();

  return (
    // ColorModeContext.Provider를 사용하여 하위 컴포넌트에서 색상 모드 토글 기능을 사용할 수 있도록 함
    <ColorModeContext.Provider value={colorMode}>
      {/* ThemeProvider를 사용하여 MUI 컴포넌트에 테마를 적용 */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* CssBaseline을 사용하여 기본 스타일을 설정 */}
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          {/* 사이드바 */}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            {/* 탑바 */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/adminUser" element={<AdminUser />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/createAdmin" element={<AdminForm />} />
              <Route path="/modifyAdmin/:id" element={<AdminForm />} />
              <Route path="/member" element={<MemberUser />} />
              <Route path="/accessBrowser" element={<AccessBrowser />} />
              <Route path="/accessReferer" element={<AccessReferer />} />

              <Route path="/accessOS" element={<AccessOs />} />
              <Route path="/order" element={<OrderList />} />
              <Route path="/delivery" element={<DeliveryList />} />
              <Route path="/product" element={<ProductList />} />
              <Route path="/RegisterProduct" element={<ProductForm />} />
              <Route path="/modifyProduct/:id" element={<ProductForm />} />
              <Route path="/seller" element={<SellerList />} />
              <Route path="/ProductQna" element={<ProductQnaList />} />
              <Route path="/certification" element={<Certification />} />
              <Route
                path="/certification/result"
                element={<CertificationResult />}
              />
              {/* <Route path="/inquiryProduct" element={<AccessReferer />} />
              <Route path="/review" element={<AccessReferer />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default AdminRouter;
