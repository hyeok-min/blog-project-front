import React, { useState } from 'react';
import { CreateUser } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [email, setEmail] = useState('');
    const [nickName, setNickName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleCreateUser = async (e) => {
        e.preventDefault();
        setError(''); // 에러 초기화

        try {
            const user = { email, nickName, passWord };
            await CreateUser(user);
            alert('회원가입 성공! 로그인 해주세요.');
            navigate('/login');
        } catch (error) {
            setError('회원가입에 실패했습니다: ' + error.response.data);
        }
    };

    const handleClose = () => {
        navigate(-1);
    };
    return (
        <div style={modalStyle}>
            <h2>회원가입</h2>
            <form onSubmit={handleCreateUser}>
                <div>
                    <label htmlFor="email">이메일:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="nickName">닉네임:</label>
                    <input
                        type="text"
                        id="nickName"
                        value={nickName}
                        onChange={(e) => setNickName(e.target.value)}
                        maxLength={10} // 최대 길이 설정
                        required
                    />
                </div>
                <div>
                    <label htmlFor="passWord">비밀번호:</label>
                    <input
                        type="password"
                        id="passWord"
                        value={passWord}
                        onChange={(e) => setPassWord(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">회원가입</button>
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
export default Create;