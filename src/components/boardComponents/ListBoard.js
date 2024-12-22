import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {fetchBoards} from '../../api/boardApi';
import { useNavigate } from 'react-router-dom'; // react-router-dom에서 useHistory 임포트

const BoardList = ({username, user, folder,setViewingboard }) => {
    const [boards, setBoards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoardss = async () => {
            try{
            console.log("response in-- "+user+folder);
            const response = await fetchBoards(user,folder);
            if (response ) {
                setBoards(response);
            } else {
                console.log("No data received or data is undefined.");
                setBoards([]); // 빈 배열로 초기화
            }
            console.log("Response: ", response);
            console.log("Response data: ", response.data);
            console.table(response);
            console.log(boards);
        }catch(err) {
            console.error("Error fetching boards: ", err);
        }};
        fetchBoardss();
    }, [user, folder]);
    const handleBoardClick = (boardId) => {
        setViewingboard(boardId);
    };
    //게시글 작성
  const handleCreateBoardClick = () => {
    console.log("게시글 작성 in");
    const username = user; // 실제 사용자 이름으로 변경
    console.log("username : "+username);
    navigate(`/${username}/create`);
  };
    return (
        <div style={styles.container}>
            <h1 style={styles.subTitle}>{folder} 게시물 리스트</h1>
            <div style={styles.postGrid}>   
            {boards.length > 0 ? (
                boards.map(board => (
                    <div key={board.id} style={styles.postCard}>
                        <Link to={`/${user}/${folder}/${board.id}`} onClick={() => handleBoardClick(board.id)} style={styles.link}>
                            <h3 style={styles.postTitle}>{board.title}</h3>
                            <p style={styles.postAuthor}>작성자 : {board.name || '알 수 없음'}</p>
                            <p style={styles.postAuthor}>조회수 : {board.view || '0'}</p>
                        </Link>
                    </div>
                ))
            ) : (
                <p>게시글이 없습니다.</p>
            )}
            </div>
            {username===user&&(
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button style={ButtonStyle} onClick={handleCreateBoardClick} >게시글 생성</button>
            </div>
            )}
        </div>
       
    );
};

// 스타일
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#2c2c2c', // 어두운 배경
        color: '#ffffff', // 텍스트 색상
    },
    subTitle: {
        fontSize: '1.5rem',
        margin: '20px 0',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    postGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // 3개씩 표시
        gap: '20px',
    },
    postCard: {
        backgroundColor: '#444', // 카드 배경 색상
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    },
    postTitle: {
        fontSize: '1.2rem',
        margin: '0 0 10px 0',
    },
    postAuthor: {
        fontSize: '0.9rem',
        color: '#aaa', // 작성자 색상
    },
    link: {
        textDecoration: 'none',
        color: '#ffffff',
    },
};
const ButtonStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    margin : 0,
};

export default BoardList;