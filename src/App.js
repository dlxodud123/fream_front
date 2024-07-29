import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App1 from "./main/app1";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import MyPage from "./myPage/js/Mypage";
import Main from "./main/app1.js";
import Detail_form from "./detail/detail_form.js";
import Buy_form from "./detail/buy_form.js";
import Detail_Chart from "./detail/detail_chart.js";
import Sell_form from "./detail/sell_form.js";
import LoginPage from "./login/js/login.js";
import Join from "./login/js/Join.js";
import Settlement from "./myPage/js/settlemet/SettlMain.js";
import FindEmail from "./login/js/FindEmail.js";
import FindPw from "./login/js/FindPw";
import Profile_edit from "./myPage/js/profile/profile_edit.js";
import Profile from "./myPage/js/profile/profile.js";
import Address from "./myPage/js/addresPage/address.js";
import Buying from "./myPage/js/buying/Buying.js";
import Selling from "./myPage/js/selling/Sell.js";
import Men from "./main/men.js";
import Women from "./main/women";
import Shope from "./main/shopeitem/shope";
import Shopeshoes from "./main/shopeitem/shopeshoes";
import Board from "./board/board.js";
import Board_form from "./board/board_form.js";
import BoardPage from "./board/board_Page.js";
import BoardContainer from "./board/BoardContainer.js";
import Buy_history_from from "./detail/buy_history_form.js";
import { useEffect } from "react";
import axios from "axios";
import ProtectedRoute from "./AdminPage/adminAccess/ProtectAdminRouter.js";
import AdminRouter from "./AdminPage/AdminRouter.js";
import ProtectedAdminLogin from "./AdminPage/adminAccess/ProtectedAdminLogin.js";
import AdminLogin from "./AdminPage/page/AdminLogin/adminLogin.js";
import { AuthProvider } from "./AdminPage/adminAccess/adminAccess.jsx";
import { UserAuthProvider } from "./Auth/UserAuthContext.jsx";
import Payment from "./myPage/js/payment/Payment";
import PointMain from "./myPage/js/point/PointMain";
import Style from "./style/style.jsx";
import Post from "./style/post.jsx";
import Saved from "./myPage/js/saved/saved.js";
import PrivateRoute from "./myPage/PrivateRoute";
import TokenHandler from "./login/TokenHandler";

function App() {
  const AppWrapper = ({ children }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.toLowerCase().startsWith("/admin");

    return <div className={isAdminRoute ? "admin" : "main"}>{children}</div>;
  };


  useEffect(() => {
    const logUserAccess = async () => {
      try {
        // 로컬 스토리지에서 데이터 가져오기 (예: 사용자 ID)
        const userId = localStorage.getItem("jwtToken");
        console.log("유저임팩트");
        // 서버로 데이터 전송
        await axios.post("/api/Access/logUserAccess", {
          userId,
        });
      } catch (error) {
        console.error("Failed to log user access:", error);
      }
    };

    // Referer URL이 있을 때만 로그 기록
    // if (document.referrer) {
    logUserAccess();
    // }
  }, []);

  return (
    <UserAuthProvider>
      <AuthProvider>
        <div className="App">
          <AppWrapper>
            <Routes>
              <Route path="/Admin/*" element={<ProtectedRoute />}>
                <Route path="*" element={<AdminRouter />} />
              </Route>
              <Route path="/LoginAdmin" element={<ProtectedAdminLogin />}>
                <Route path="" element={<AdminLogin />} />
              </Route>
              <Route
                path="/"
                element={
                  <App1>
                    <Main></Main>
                  </App1>
                }
              ></Route>
              {/* jwtToken 처리 라우트 */}
        <Route path="/yourTargetPage" element={<TokenHandler />} />
              <Route path="/my/saved" element={<Saved></Saved>}></Route>
              <Route path="/shop" element={<Shope></Shope>}></Route>
              <Route path="/shop" element={<Shopeshoes />}></Route>
              <Route path="/men" element={<Men />}></Route>
              <Route path="/women" element={<Women></Women>}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/join" element={<Join />} />
              <Route path="/login/find_email" element={<FindEmail />} />
              <Route path="/login/find_password" element={<FindPw />} />
              <Route path="/myPage" element={ <PrivateRoute><MyPage/></PrivateRoute>}></Route>
              <Route path="/my/profile" element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
              <Route path="/my/profile-edit" element={ <PrivateRoute><Profile_edit /></PrivateRoute>}></Route>
              <Route path="/my/address" element={ <PrivateRoute><Address /></PrivateRoute>}></Route>
              <Route path="/my/account" element={ <PrivateRoute><Settlement /></PrivateRoute>}></Route>
              <Route path="/my/buying" element={ <PrivateRoute><Buying /></PrivateRoute>}></Route>
              <Route path="/my/selling" element={ <PrivateRoute><Selling /></PrivateRoute>}></Route>
              <Route path="/my/payment" element={ <PrivateRoute><Payment /></PrivateRoute>}></Route>
              <Route path="/my/point" element={ <PrivateRoute><PointMain /></PrivateRoute>}></Route>
              <Route path="/*" element={<BoardContainer />} />
              <Route path="/Style" element={<Style />} />
              <Route path="/post" element={<Post />} />
              <Route
                path="/products/:id"
                element={<Detail_form></Detail_form>}
              ></Route>
              <Route
                path="/sell/:id/:size"
                element={<Sell_form></Sell_form>}
              ></Route>
              <Route
                path="/buy/:id/:size"
                element={<Buy_form></Buy_form>}
              ></Route>
              <Route
                path="/buy/history"
                element={<Buy_history_from></Buy_history_from>}
              ></Route>
            </Routes>
          </AppWrapper>
        </div>
      </AuthProvider>
    </UserAuthProvider>
  );
}

export default App;