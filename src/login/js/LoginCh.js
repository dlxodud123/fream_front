import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from './TokenContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useToken();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      const response = await fetch('your-api-endpoint/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token); // 토큰을 설정
        navigate('/dashboard'); // 로그인 성공 후 대시보드로 이동
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
