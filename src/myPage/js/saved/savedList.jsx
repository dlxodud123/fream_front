import React from 'react';
import { useNavigate } from "react-router-dom";

function SavedList(props) {
    const { Saveddata, onDelete } = props;
    const navigate = useNavigate();

    const handlePurchaseClick = () => {
        navigate(`/products/${Saveddata.id}`);
    };

    return (
        <div style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', display: 'flex' }}>
            <div style={{ marginRight: '40px' }}>
                <img
                    style={{
                        margin: '0 auto',
                        marginTop: '15px',
                        marginBottom: '15px',
                        background: "#f4f4f4",
                        width: '80px',
                        height: '80px',
                        border: 'none'
                    }}
                    className="img-a-1"
                    src={Saveddata.img}
                    alt="Product"
                />
            </div>
            <div style={{ marginTop: '10px' }}>
                <p style={{ fontSize: '15px' }}>
                    {Saveddata.maker}
                    <br />
                    {Saveddata.title}
                </p>
                <p style={{ fontWeight: 'bold', fontSize: '15px', marginTop: '30px' }}>{Saveddata.size}</p>
            </div>
            <div style={{ display: 'flex', height: '55px', marginLeft: 'auto', marginTop: '10px' }}>
                <div style={{ marginTop: '15px', width: '150px' }}>
                    <button
                        style={{
                            width: "170px",
                            height: "60px",
                            display: "flex",
                            color: "white",
                            backgroundColor: "rgb(239, 98, 83)",
                            borderRadius: "10px",
                            fontWeight: "bold",
                            border: "none",
                            marginRight: '30px'
                        }}
                        onClick={handlePurchaseClick}
                    >
                        <div
                            style={{
                                width: "50px",
                                marginTop: "16px",
                                marginLeft: "12px",
                                textAlign: "left",
                                fontSize: "20px"
                            }}
                        >
                            구매
                        </div>
                        <div style={{ width: "1px", height: "59px", backgroundColor: "rgba(0,0,0,0.1)" }}></div>
                        <div style={{ marginLeft: "9px" }}>
                            <div style={{ fontSize: "17px", height: "20px", marginTop: "10px", textAlign: "left" }}>130000원</div>
                            <div style={{ fontWeight: "lighter", fontSize: "12px", textAlign: "left" }}>즉시 구매가</div>
                        </div>
                    </button>
                    <div style={{ marginLeft: '130px' }}>
                        <a
                            style={{ fontSize: '10px', borderBottom: '1px solid gray', cursor: 'pointer' }}
                            onClick={() => onDelete(Saveddata.id)}
                        >
                            삭제
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SavedList;
