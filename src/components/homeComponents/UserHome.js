import React, { useEffect,useState } from 'react';
import {fetchBoardsUser} from '../../api/boardApi'

const UserHome = ({ viewingBlogger }) => {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        const fetchBoards = async () => {
            try{
            console.log("response in-- ");
            const response = await fetchBoardsUser(viewingBlogger);
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
        fetchBoards();
    }, [viewingBlogger]);

    

    return (
        <div style={styles.container}>
            <h2 style={styles.subTitle}>{viewingBlogger}님 블로그의 인기 글</h2>
            <div style={styles.postGrid}>
                {boards.map(post => (
                    <div key={post.id} style={styles.postCard}>
                    <h3 style={styles.postTitle}>{post.title}</h3>
                    <p style={styles.postAuthor}>작성자 : {post.name}</p>
                    <p style={styles.postAuthor}>조회수 : {post.view}</p>
                </div>
                ))}
            </div>
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
        gridTemplateColumns: 'repeat(3, 1fr)', // 3~4개씩 표시
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
};

export default UserHome;