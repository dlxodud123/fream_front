import Header from "../../../common/header";
import MypageList from "../MypageList";
import '../../css/address/address.css';
import { useState } from "react";
import AddresLayer from './AddresLayer.js'
import Footer from "../../../common/footer";

const Address = () => {

    const [addressLayer, setAddressLayer] = useState(false);
    const toggleLayer = () => {
        setAddressLayer(!addressLayer);
    };

    return(
<div>
    <Header />
    <div className="container">
        <div className="row">
            <div className="col-sm-3">
                <MypageList />
            </div>
            <div className="col-sm-9">
            <div className="content_title">
                <div className="title">
                    <h3>주소록</h3>
                </div>
                <div className="btn_box">
                    <button
                        type="button"
                        className="unitAll"
                        onClick={() =>setAddressLayer(true)}>
                    +새 배송지 추가
                    </button>
                    {addressLayer && <AddresLayer onClose={toggleLayer} />}
                </div>
            </div>
            <div>
                <div className="basic">
                    <div className="my_list">

                    </div>
                </div>

            </div>

            </div>
        </div>
    </div>
    <Footer />
</div>
    )
}

export default Address;