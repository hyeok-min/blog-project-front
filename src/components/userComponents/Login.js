import React, { useState } from 'react';
import { loginUser } from '../../api/userApi';
import { useNavigate } from 'react-router-dom'; // react-router-dom에서 useHistory 임포트

const Login = ( {setUsername, setViewingBlogger,setUserRole}) => {
    const [email, setEmail] = useState('');
    const [passWord, setPassword] = useState('');
    const navigate = useNavigate();


    const handleClose = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //로그인 요청
            const user = { email, passWord }; // 사용자 정보 객체 생성
            console.log("try = email",email);
            console.log("try = pass",passWord);
            const response = await loginUser(user); // loginUser 호출
            console.log("status = ",response.status);
            //응답처리
                if (Number(response.status) === 200) {
                console.log("응답 들어옴");
                console.log(response);
                console.log(response.data.user.username);
                setUsername(response.data.user.nickName);
                setViewingBlogger(response.data.user.nickName);
                setUserRole(response.data.user.role);
                console.log(setUserRole);
                alert('로그인 성공!');
                navigate(-1);
                // navigate('/'+response.data.user.nickName);
            }
        } catch (error) {
            console.error('로그인 실패', error);
            alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.');
        }
    };

    return (
        <div style={modalStyle}>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="비밀번호" value={passWord} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">로그인</button>
                <button type="button" onClick={handleClose}>취소</button>
            </form>
        </div>
    );
};

const modalStyle = {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000
};

export default Login;