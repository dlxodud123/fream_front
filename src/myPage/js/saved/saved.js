import Header from '../../../common/header';
import Footer from '../../../common/footer';
import './saved.css';
import MypageList from '../MypageList';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SavedList from './savedList';
import saveListdata from '../../../../src/mendata/mendata';

function Saved() {
    const [count, setCount] = useState(6); 
    const [savedData, setSavedData] = useState(saveListdata);
    const [clickedButton, setClickedButton] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedState = localStorage.getItem('clickedButton');
        if (savedState) {
            setClickedButton(savedState);
        }
    }, []);

    const handleClick = (buttonId) => {
        setClickedButton(buttonId);
        localStorage.setItem('clickedButton', buttonId);
        navigate('/my/saved');
    };

    const handleClick1 = (buttonId) => {
        setClickedButton(buttonId);
        localStorage.setItem('clickedButton', buttonId);
        navigate('/my/saved/#');
    };

    const getButtonStyle = (buttonId) => ({
        marginTop: '15px',
        border: '1px solid rgba(0,0,0,0.1)',
        width: '70px',
        padding: '7px',
        textAlign: 'center',
        borderRadius: '20px',
        fontSize: '15px',
        backgroundColor: clickedButton === buttonId ? 'black' : 'white',
        color: clickedButton === buttonId ? 'white' : 'black',
        cursor: 'pointer'
    });

    const getButtonStyle1 = (buttonId) => ({
        marginTop: '15px',
        border: '1px solid rgba(0,0,0,0.1)',
        width: '100px',
        padding: '7px',
        textAlign: 'center',
        borderRadius: '20px',
        fontSize: '15px',
        backgroundColor: clickedButton === buttonId ? 'black' : 'white',
        color: clickedButton === buttonId ? 'white' : 'black',
        cursor: 'pointer',
        marginLeft: '15px'
    });

    const handleDelete = (id) => {
        setSavedData(savedData.filter(item => item.id !== id));
    };

    return (
        <>
            <div style={{ margin: '0 auto', padding: '0', width: '1280px' }}>
                <Header />
                <div style={{ marginLeft: '40px', marginTop: '35px', display: 'flex' }}>
                    <MypageList />
                    <div style={{ marginLeft: '100px', paddingBottom: '20px' }}>
                        <h3 style={{ fontWeight: 'bold' }}>관심</h3>
                        <div style={{ borderBottom: '4px solid black', width: '1000px', borderRadius: '10px' }}></div>
                        <div style={{ display: 'flex' }}>
                            <div onClick={() => handleClick('button1')} style={getButtonStyle('button1')}>상품</div>
                            <div onClick={() => handleClick1('button2')} style={getButtonStyle1('button2')}> 최근 본 상품 </div>
                        </div>
                        <div style={{ marginTop: '15px', marginLeft: '7px' }}>
                            <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '14px' }}>전체123</p>
                            {savedData.length === 0 ? (
                                <p style={{ textAlign: 'center', fontSize: '20px', color: 'rgba(0,0,0,0.5)' }}>관련 상품이 존재하지 않습니다</p>
                            ) : (
                                savedData.slice(0, count).map((item, i) => (
                                    <SavedList key={item.id} Saveddata={item} onDelete={handleDelete} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Saved;
