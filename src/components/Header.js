import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import  {LogOut}  from '../api/userApi';
import { Link } from 'react-router-dom';
const Header = ({username,setUsername,setViewingBlogger,setViewingboard,setViewingfolder,userRole}) => {
    const navigate = useNavigate(); // useHistory 훅 사용
    const handleLoginClick = () => {
        navigate('/login'); // 로그인 페이지로 이동
    };

    const handleUserRegisterClick = () => {
        navigate('/create'); // 회원가입 페이지로 이동
    };

    const handleLogout = async () => {
        try {
            await LogOut(); // 로그아웃 API 호출
            setUsername(''); // 사용자 이름 초기화
            alert('로그아웃 성공!'); // 로그아웃 성공 알림
            navigate('/'); // 로그인 페이지로 리디렉션
        } catch (error) {
            console.error('로그아웃 실패', error);
            alert('로그아웃에 실패했습니다.');
        }
    };
    const handleUserQuestionClick  = async()=> {
        console.log('question ' + username); // 로그 추가
        if (username) {
            navigate(`/${username}/question`);
        } else {
            console.error("Username is undefined or empty");
        }
    };
    const handleUserQuestionAdminClick  = async()=> {
        console.log('question ' + username); // 로그 추가
        if (username) {
            navigate(`/admin/questionList`);
        } else {
            console.error("list is undefined or empty");
        }
    };

    const handleSidebarChange = () => {
        setViewingBlogger(username); // 사이드바 내용 변경
    };

    return (
        <header style={headerStyle}>
            <h1><Link to={`/`} style={linkStyle}>BlogProJ</Link></h1>
            <SearchBar setViewingBlogger={setViewingBlogger} setViewingboard={setViewingboard} setViewingfolder={setViewingfolder}/>
            {username ? (
    userRole === 'admin' ? (
        <div style={{ display: 'flex', gap: 15 }}>
            <p>{username}님</p>
            <button style={loginButtonStyle} onClick={handleUserQuestionAdminClick}>문의답변</button>
            <button style={loginButtonStyle} onClick={handleLogout}>로그아웃</button>
        </div>
    ) : (
        <div style={{ display: 'flex', gap: 15 }}>
            <p>
                <Link
                    to={`/${username}/modify`}
                    style={{ color: '#ffffff', textDecoration: 'none' }}
                    onClick={handleSidebarChange}
                >
                    {username}님
                </Link>
            </p>
            <button style={loginButtonStyle} onClick={handleUserQuestionClick}>문의하기</button>
            <button style={loginButtonStyle} onClick={handleLogout}>로그아웃</button>
        </div>
    )
)  : (
                <div style={{ display: 'flex', gap: 3 }}>
                <button style={loginButtonStyle} onClick={handleLoginClick}>로그인</button>
                <button style={loginButtonStyle} onClick={handleUserRegisterClick}>회원가입</button>
            </div>
            )}
        </header>
    );
};

const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#333', // 어두운 배경색
    color: '#fff',
};

const linkStyle = {
    color: 'white', // 부모 요소의 색상을 상속받습니다.
    textDecoration: 'none', // 밑줄 제거
};

const titleStyle = {
    margin: 0,
};



const loginButtonStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    margin : 0,
};

export default Header;