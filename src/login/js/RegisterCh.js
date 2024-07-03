import React, { useState } from 'react';
import $ from 'jquery';

const LoginForm = () => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        $.ajax({
            url: "http://43.200.110.19:8080/auth/loginCheck",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ userId, userPw }),
            success: function (data) {
                const jwtToken = data;
                if (jwtToken) {
                    setToken(jwtToken);
                    console.log("success");
                    localStorage.setItem('jwtToken', jwtToken);
                } else {
                    console.log("fail");
                    setError('Login failed. Please check your credentials.');
                }
            },
            error: function (xhr, status, error) {
                console.error('There was an error logging in!', error);
                setError('An error occurred during login. Please try again.');
            }
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userId">User ID:</label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="userPw">Password:</label>
                    <input
                        type="password"
                        id="userPw"
                        value={userPw}
                        onChange={(e) => setUserPw(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
            {token && <p>Login successful! Token: {token}</p>}
        </div>
    );
};




function registerCheck(formData) {
    const { userId, userPw, userName, email, phone, age, gender } = formData;

    if (!userPw) {
        alert('please enter pw');
        return;
    }
    if (!userName) {
        alert('please enter name');
        return;
    }
    if (!email) {
        alert('please enter email');
        return;
    }
    if (!phone) {
        alert('please enter phone');
        return;
    }
    if (!age) {
        alert('please enter age');
        return;
    }
    if (!gender) {
        alert('please select gender');
        return;
    }

    $.ajax({
        url: "http://43.200.110.19:8080/auth/rddCheck",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
            console.log(response.code);
            if (response.code == 1) {
                console.log("ok");
                alert("회원가입이 정상적으로 완료되었습니다.");
                window.location.href = "/auth/loginMenu";
            } else {
                console.log("not ok");
                alert('비정상적인 요청');
                window.location.href = "/auth/registerMenu";
            }
        }
    });
}

export { LoginForm, registerCheck };