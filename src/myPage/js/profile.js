import Header from '../../common/header';
import Footer from '../../common/footer';


const Profile = () =>{

    return(
        <div>
            <div>
                <Header />
            </div>
            <div>
                <div className="col-sm-3">
                <div className="mypage">
                    <h2>마이페이지</h2>
                </div>
                </div>


                
                <div className="col-sm-9">
                    <div>
                        <h3>프로필 관리</h3>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )



}

export default Profile;