import React, { useEffect, useState, useContext } from 'react';
import '../css/My_Page.css';
import '../css/Mypage_inventory.css';
import '../css/Shortcut_grid.css';
import '../css/User_membership.css';
import '../css/Purchase.css';
import '../css/Selling.css';
import MypageList from './MypageList.js';
import Header from '../../common/header';
import Footer from '../../common/footer';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import blank_profile from '../../img/login-page/blank_profile.4347742.png';
import { UserAuthContext } from '../../Auth/UserAuthContext.jsx';



const MyPage = () => {
  const { isLoggedIn, isInitialized, userId, handleLogout } = useContext(UserAuthContext);
  const navigate = useNavigate();
  // let [userId, setUserId] = useState();
  let [email, setEmail] = useState();
  const defaultProfileImg = blank_profile;
  let [userImg, setUserImg] = useState(defaultProfileImg);//프로필 이미지변경
  const [date, setDate] = useState({
    img: '',
    userId: '',
    userName: '',
    profileName: '',
    userBio: ''
  });
  
  useEffect(() => {
    axios.get('/api/myPage')
      .then(res => {
        console.log("Response Data:", res.data);
        const profileImg = res.data.profileUrl || defaultProfileImg; // 기본 이미지로 설정

        setDate({
          img: profileImg,
          userId: res.data.userId,
          userEmail: res.data.email,
          profileName: res.data.profileName,
          userBio: res.data.userBio
        });
        setUserImg(profileImg); // 상태 업데이트
      })
      .catch(error => {
        console.log('profile 에러 useEffect', error);
      });
  }, [isInitialized, isLoggedIn, navigate, defaultProfileImg]);

  if (!isInitialized) {
    return <div></div>;
  }
  const baseUrl = '/api/upload/ProfileImg/';
  const imageUrl = userImg.startsWith('/upload/ProfileImg/') ? baseUrl + userImg.split('/upload/ProfileImg/')[1] : userImg;

return (
  <div>
  <Header />
    <div className="container_box">
      <div className="bd-sidebar">
        <MypageList />
      </div>


      <div className="box-container">
      {isLoggedIn ? (
            <>
      <div className='user_membership'>
        <div className='user_detail'>
          <div className='blank-por'>
            <img className='img_blank' src={imageUrl}></img>
          </div>
          
          <div className="user-info">
            <div className='info-box'>
              <strong className='name'>{date.userId}</strong>
              <p className='email_mypage'>{date.userEmail}</p>
            </div>
            <div>
              <button type="button" className="info-but" onClick={()=>{
                navigate('/my/profile-edit')
              }}>프로필관리</button>
            </div>
          </div>
        </div>
      </div>

        <div className="container_text-center">
      <div className='shortcut_grid'>
          <button className='mypage_pageMove'>
            <div className="menu_item">
              <div className='seller-grade'></div>
              <span>판매자 등급</span>
            </div>
          </button>
          <button className='mypage_pageMove'>
          <div className="menu_item">
              <div className='seller-p'></div>  
              <span>P</span>
            </div>
          </button>

          <button className='mypage_pageMove'>
          <div className="menu_item">
              <div className='seller-cupon'></div>  
              <span>쿠폰</span>
            </div>  
          </button>
        
          <button className='mypage_pageMove'>
          <div className="menu_item">
              <div className='seller-phon'></div>  
              <span>내 폰 시세</span>
            </div>
          </button>

          <button className='mypage_pageMove'>
            <div className="menu_item">
              <div className='seller-invite'></div>  
              <span>친구 초대</span>
            </div>
          </button>

          <button className='mypage_pageMove'>
            <div className="menu_item">
              <div className='seller-announcement'></div>  
              <span>공지사항</span>
            </div>
          </button>
        </div>       
      </div>


      <div className="section">
        <div className='my_home_title'>
          <h3 className="title_inventory">보관 판매 내역</h3>
            <Link to={"/my/inventory"} className='btn_txt'>더보기<FontAwesomeIcon icon={faChevronRight} />
            </Link>
        </div>

          <div className='inventory_box'>
            <div className="row row-cols-4">
                  <div className="tab_item total">
                    <Link to={""} className='titl_link'>발송요청
                      <div className='count_inventory'>0</div>
                    </Link>
                  </div>
                  <div className="tab_item total">
                    <Link to={""} className='tab_item'>판매대기
                      <div>0</div>
                    </Link>
                  </div>
                  <div className="tab_item total">
                    <Link to={""} className='tab_item'>판매 중
                      <div>0</div>
                    </Link>
                  </div>
                  <div className="tab_item total">
                    <Link to={""} className='tab_item'>정산완료
                      <div>0</div>
                    </Link>
                  </div>
            </div>
          </div>
          <div className='banner_area'>
            <a className="banner-link" href='#'>
                <div className='logo'></div>
              <div>
              <p className='banner_title'>보관 신청하기</p>
              <p className='banner_desc'>한 번에 신청하고 한 번에 발송하세요.</p>
              </div>
              <div className='saveIconBtn'>
              <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </a>
          </div>
        </div>



        <div className="section">
          <div className='my_home_title'>
            <h3 className="title_inventory">구매 내역</h3>
            <Link to={"/my/buying"} className='btn_txt'>더보기<FontAwesomeIcon icon={faChevronRight} /></Link>
          </div>
          <div className='purchase_list_tab'>
            <div className="row row-cols-4">
              <div className="tab_item total">
                <Link className='titl_link'
                      to={'/'}>전체
                  <div className='count_inventory'>0</div>
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
        <div>
        { date.length == 0 ? (
          <div>
              <div className='myPageMain'>
                  <p className='paymentNull'>거래 내역이 없습니다.</p>
              </div>
          </div>
          ) : (
              <div>

              </div>
          )}
        </div>

        
            

        <div className="section">
          <div className='my_home_title'>
            <h3 className="title_inventory">판매 내역</h3>
            <Link to={"/my/selling"} className='btn_txt'>더보기<FontAwesomeIcon icon={faChevronRight} /></Link>
          </div>
          <div className='selling'>
            <div className="row row-cols-4">
              <div className="tab_item total">
                <Link className='titl_link'>전체
                  <div className='count_inventory'>0</div>
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
        <div>
        { date.length == 0 ? (
          <div>
              <div className='myPageMain'>
                  <p className='paymentNull'>거래 내역이 없습니다.</p>
              </div>
          </div>
          ) : (
              <div>

              </div>
          )}
</div>
            </>
          ) : (
            <div>
              <p>로그인이 필요합니다.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;