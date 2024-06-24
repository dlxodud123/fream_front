async function handleLogin(event) {
    event.preventDefault(); // Prevent form submission
    
    const username = document.getElementById('userId').value;
    const password = document.getElementById('userPw').value;
    
    try {
        const token = await loginAndGetToken(username, password);
        
        if (token === ""){
            document.getElementById('error-message').innerText = 'Login failed. Please try again.';             
        }
        
        else{
            localStorage.setItem('jwtToken', token);
            window.location.href = '/normalUser/afterLogin?token='+token;  // 여기서 어떨게 이요청에 헤더 에 집어넣을지
        }

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error-message').innerText = 'Login failed. Please try again.';
    }
}


async function loginAndGetToken(userId, userPw) {
    const response = await fetch('/auth/loginCheck', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',    
        },
        body: new URLSearchParams({
            userId: userId,
            userPw: userPw
        })
    });

    if (response.ok) {
        const jwtToken = await response.text();
        return jwtToken;
    } else {
        throw new Error('Login failed');
    }
}
function ToWelcomePage(){
  window.location.href='/';
}
  
export default handleLogin;