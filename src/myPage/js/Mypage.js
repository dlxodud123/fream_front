import '../css/MyPage.css';
import '../css/Mypage_inventory.css';
import '../css/Shortcut_grid.css';
import '../css/User_membership.css';
import '../css/Purchase.css';
import '../css/Selling.css';
import MypageList from './MypageList.js';
import Header from '../../common/header';
import Footer from '../../common/footer';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';



const MyPage = () => {
  let [userId, setUserId] = useState();
  let [email, setEmail] = useState();
  let navigate = useNavigate();


return (
  <div>
  <Header />
    <div className='snb_area'>
    <div className="row">
      <div className="col-sm-3">
        <MypageList />
      </div>


      <div className="col-sm-9">
      <div className='user_membership'>
        <div className='user_detail'>
          <div className='blank-por'>
            <img className='img_blank' src={require('../../img/login-page/blank_profile.4347742.png')}></img>
          </div>
          
          <div className="user-info">
            <div className='info-box'>
              <strong className='name'>{userId}userId</strong>
              <p className='email'>{email}emxxxx@naver.com</p>
            </div>
            <div>
              <button type="button" className="info-but" onClick={()=>{
                navigate('/my/profile-edit')
              }}>프로필관리</button>
            </div>
          </div>
        </div>
      </div>

      <div className='shortcut_grid'>

        <div className="container text-center">
          <div className="row row-cols-3 row row-cols-4 row row-cols-6">
            <div className="col">
              <div className='seller-grade'></div>
              판매자 등급
            </div>
            <div className="col">
              <div className='seller-p'></div>  
              P
            </div>
            <div className="col">
              <div className='seller-cupon'></div>  
              쿠폰
            </div>
            <div className="col">
              <div className='seller-phon'></div>  
              내 폰 시세
            </div>
            <div className="col">
              <div className='seller-invite'></div>  
              친구 초대
            </div>
            <div className="col">
              <div className='seller-announcement'></div>  
              공지사항
            </div>
          </div>
        </div>
        
      </div>


      <div className="section">
          <div className='my_home_title'>
            <h3 className="title">보관 판매 내역</h3>
            <Link to={"/my/inventory"} className='btn_txt'>더보기</Link>
          </div>
          <div className='inventory_box'>
            <div className="row row-cols-4">
                  <div className="tab_item total">
                    <Link className='titl_link'>발송요청
                      <div className='count'>0</div>
                    </Link>
                  </div>
                  <div className="tab_item total">
                    <Link className='tab_item'>판매대기
                      <div>0</div>
                    </Link>
                  </div>
                  <div className="tab_item total">
                    <Link className='tab_item'>판매 중
                      <div>0</div>
                    </Link>
                  </div>
                  <div className="tab_item total">
                    <Link className='tab_item'>정산완료
                      <div>0</div>
                    </Link>
                  </div>
            </div>
          </div>
          <div>
            <a className="banner-link" href='#'>
                <div className='logo'></div>
              <div>
              <p className='banner_title'>보관 신청하기</p>
              <p className='banner_desc'>한 번에 신청하고 한 번에 발송하세요.</p>
              </div>
            </a>
          </div>
        </div>



        <div className="section">
          <div className='my_home_title'>
            <h3 className="title">구매 내역</h3>
            <Link to={"/my/bying"} className='btn_txt'>더보기</Link>
          </div>
          <div className='purchase_list_tab'>
            <div className="row row-cols-4">
              <div className="tab_item total">
                <Link className='titl_link'>전체
                  <div className='count'>0</div>
                </Link>
              </div>
              <div className="tab_item total">
                <Link className='tab_item'>입찰 중
                  <div>0</div>
                </Link>
              </div>
              <div className="tab_item total">
                <Link className='tab_item'>진행 중
                  <div>0</div>
                </Link>
              </div>
              <div className="tab_item total">
                <Link className='tab_item'>종료
                  <div>0</div>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className='purchase_list all'>
  
            </div>

          </div>
        </div>

        
            

        <div className="section">
          <div className='my_home_title'>
            <h3 className="title">판매 내역</h3>
            <Link to={"/my/selling"} className='btn_txt'>더보기</Link>
          </div>
          <div className='selling'>
            <div className="row row-cols-4">
              <div className="tab_item total">
                <Link className='titl_link'>전체
                  <div className='count'>0</div>
                </Link>
              </div>
              <div className="tab_item total">
                <Link className='tab_item'>입찰 중
                  <div>0</div>
                </Link>
              </div>
              <div className="tab_item total">
                <Link className='tab_item'>진행 중
                  <div>0</div>
                </Link>
              </div>
              <div className="tab_item total">
                <Link className='tab_item'>종료
                  <div>0</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
  </div>
    
  );
};

export default MyPage;