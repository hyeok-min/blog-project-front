import React, { useState, useEffect } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import { updateUser,userInfo } from '../../api/userApi';

const Update = ({username, setUsername }) => {
    const navigate = useNavigate();
    const { username: paramUsername } = useParams(); // URL에서 username 파라미터 추출
    const [newInfo, setNewInfo] = useState({
        name: '',
        email: '',
    });
    console.log("Update 컴포넌트에서의 setUsername:", setUsername);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    
    // 컴포넌트 마운트 시 사용자 정보 로드
    useEffect(() => {
        // 사용자 정보를 API에서 가져오는 함수 (예시)
        const loadUserData = async () => {
            try {
                // API에서 사용자 정보를 가져오는 로직 추가
                const userData = await userInfo(paramUsername);
                console.log(userData);
                setNewInfo({
                    name: userData.data.nickName,
                    email: userData.data.email,
                });
            } catch (error) {
                console.error('사용자 정보 로드 실패:', error);
            }
        };

        loadUserData();
    }, [paramUsername]);

    // 입력 변경 처리
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    // 회원 정보 수정 클릭 처리
    const handleUpdateClick = async () => {
        if (password === '') {
            setError('비밀번호는 필수 입력 값입니다.'); // 비밀번호가 비어있을 경우 오류 메시지 설정
            return;
        }
        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }


        try {
            console.log("회원 정보 수정전");
            await updateUser(paramUsername, { 
                email : newInfo.email,
                nickName : newInfo.name,
                passWord: password });
                console.log("setusername 전");
                setUsername(newInfo.name);
            console.log("회원 정보 수정됨:", newInfo);
            navigate('/'+newInfo.name); // 수정 후 사용자 페이지로 이동
        } catch (error) {
            setError('회원 정보 수정에 실패했습니다.');
            console.error(error);
        }
    };

    return (
        <div style={modalStyle}>
        <h2>회원 정보 수정</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
            <label>
                닉네임:
                <input
                    type="text"
                    name="name"
                    value={newInfo.name}
                    onChange={handleInputChange}
                    required
                />
            </label>
        </div>
        <div>
            <label>
                이메일:
                <input
                    type="email"
                    name="email"
                    value={newInfo.email}
                    onChange={handleInputChange}
                    required
                />
            </label>
        </div>
        <div>
            <label>
                비밀번호:
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </label>
        </div>
        <div>
            <label>
                비밀번호 확인:
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                />
            </label>
        </div>
        <button onClick={handleUpdateClick}>
            회원 정보 수정
        </button>
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

export default Update;