import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App1 from './main/app1';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MyPage from './myPage/js/Mypage';
import Main from './main/app1.js';
import Detail_form from './detail/detail_form.js'
import Buy_form from './detail/buy_form.js';
import Detail_Chart from './detail/detail_chart.js';
import Sell_form from './detail/sell_form.js';
import LoginPage from './login/js/login.js';
import Join from './login/js/Join.js'
import FindEmail from './login/js/FindEmail.js';
import FindPw from './login/js/FindPw';
import Profile_edit from './myPage/js/profile/profile_edit.js';
import Profile from './myPage/js/profile/profile.js';
import Address from './myPage/js/addresPage/address.js'
import Buying from './myPage/js/buying/Buying.js'
import Men from './main/men.js';
import Women from './main/women';
import Shope from './main/shopeitem/shope';
import Shopeshoes from './main/shopeitem/shopeshoes';
import Board from './board/board.js';
import Board_form from './board/board_form.js';
import BoardPage from './board/board_Page.js';
import BoardContainer from './board/BoardContainer.js';
import Buy_history_from from './detail/buy_history_form.js';

function App() {
  const AppWrapper = ({ children }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.toLowerCase().startsWith("/admin");
  
    return <div className={isAdminRoute ? "admin" : "main"}>{children}</div>;
  };

  return (
    <div className="App" >
      <AppWrapper>
        <Routes>
          <Route path='/' element={<App1><Main></Main></App1>}></Route>
          <Route path='/shop' element={<Shope></Shope>}></Route>
          <Route path='/shop' element={<Shopeshoes/>}></Route>
          <Route path='/men' element={<Men/>}></Route>
          <Route path='/women' element={<Women></Women>}></Route>
          <Route path='/myPage' element={<MyPage></MyPage>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/join' element={<Join/>}/>
          <Route path='/login/find_email' element={<FindEmail/>}/>
          <Route path='/login/find_password' element={<FindPw />}/>
          <Route path='/my/profile-edit' element={<Profile_edit/>}></Route>
          <Route path='/my/profile' element={<Profile/>}></Route>
          <Route path='/my/address' element={<Address/>}></Route>
          <Route path='/my/buying' element={<Buying/>}></Route>
          <Route path='/products/:id' element={<Detail_form></Detail_form>}></Route>
          <Route path='/buy/:data/:size' element={<Buy_form></Buy_form>}></Route>
          <Route path="/*" element={<BoardContainer />} />
          <Route path='/sell/:data/:size' element={<Sell_form></Sell_form>}></Route>
          <Route path='/buy/history' element={<Buy_history_from></Buy_history_from>}></Route>
        </Routes>
      </AppWrapper>

    </div>
  );
}

export default App;
