import React, { useEffect,useState } from 'react';
import {fetchBoardsAll} from '../../api/boardApi'
import { Link } from 'react-router-dom';

const Home = ({setViewingBlogger,setViewingboard,setViewingfolder}) => {
    const [boards, setBoards] = useState([]);
    
    useEffect(() => {
        const fetchBoards = async () => {
            try{
            console.log("response in-- ");
            const response = await fetchBoardsAll();
            setViewingBlogger('');
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
    }, []);
    const handleBoardClick = (boardId,blogger,foldername) => {
        setViewingboard(boardId);
        setViewingBlogger(blogger);
        setViewingfolder(foldername);
    };
    return (
        <div style={styles.container}>
            <h2 style={styles.subTitle}>인기 글</h2>
            <div style={styles.postGrid}>
                {boards.map(post => (
                    <div key={post.id} style={styles.postCard}>
                         <Link to={`/${post.name}/${post.folderName}/${post.id}`} onClick={() => handleBoardClick(post.id,post.name,post.folderName)} style={styles.link}>
                        <h3 style={styles.postTitle}>{post.title}</h3>
                        <p style={styles.postAuthor}>작성자 : {post.name}</p>
                        <p style={styles.postAuthor}>조회수 : {post.view}</p>
                        </Link>
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
    link: {
        textDecoration: 'none',
        color: '#ffffff',
    }
};

export default Home;