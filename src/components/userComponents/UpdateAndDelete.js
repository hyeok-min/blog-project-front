import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {deleteUser} from '../../api/userApi';
const UpdateAndDelete = ({ username: propUsername, setUsername }) => {
  const { username: paramUsername } = useParams(); // URL에서 username 가져오기
  const navigate = useNavigate(); // useHistory 훅 사용

 // 회원 정보 수정 로직 추가
  const handleUpdateClick = () => {
    navigate(`/${paramUsername}/update`);
   
    console.log("회원 정보 수정 클릭됨");
  };

 // 회원 삭제 로직 추가
  const handleDeleteClick= async () =>  {
    const isConfirmed = window.confirm("정말로 회원 탈퇴하시겠습니까?");
  
  if (!isConfirmed) {
    return; // 사용자가 취소하면 함수 종료
  }
    try {
      console.log("delete in", paramUsername);
      await deleteUser(paramUsername); // 회원 삭제
      alert('회원삭제'); 
      setUsername('');
      navigate('/'); // 로그인 페이지로 리디렉션
  } catch (error) {
      console.error('회원삭제 실패', error);
      alert('회원삭제를 실패했습니다.');}
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{paramUsername}님</h1>
      <div style={{ display: 'flex', gap: 15 }}>
        <button onClick={handleUpdateClick} style={styles.ButtonStyle}>회원 정보 수정</button>
        <button onClick={handleDeleteClick} style={styles.ButtonStyle}>회원 삭제</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // 화면 중앙에 배치
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f0f0f0', // 밝은 색으로 변경
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', // 텍스트 그림자 추가
  },
  buttonContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  ButtonStyle : {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    margin : 0,
  }
};

export default UpdateAndDelete;