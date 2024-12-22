import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {QuestionList} from '../../api/questionApi';


const ListQuestions = ({username}) => {
    const [Questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchQuestion = async () => {
            
            try{
            const response = await QuestionList(username);
            console.log("question response"+response);
            if (response && Array.isArray(response)) {
                setQuestions(response);
              } else if (response && response.data && Array.isArray(response.data)) {
                setQuestions(response.data);
              } else {
                console.log("No data received or data is not an array.");
                setQuestions([]); // 빈 배열로 초기화
              }
            } catch (err) {
              console.error("Error fetching questions: ", err);
              
            } };
        fetchQuestion();
    }, []);
    const handleNewQuestion = () => {
        navigate(`/${username}/question/new`);
      };
      const getStatusStyle = (status) => {
        switch (status) {
            case 'WAIT':
                return { color: 'red' }; // WAIT 상태는 빨간색
            case 'ANSWER':
                return { color: 'blue' }; // ANSWER 상태는 파란색
            default:
                return { color: 'black' }; // 기본 색상
        }
    };
    return (
        <div className="board-container">
            <h1>문의 게시판</h1>
            
            {Questions.map(question => (
          <div key={question.id} style={styles.postCard}>
            <Link to={`/${username}/question/${question.id}`} style={styles.link}>
              <h3 style={styles.postTitle}>{question.title}</h3>
              <p style={styles.postContent}>{question.content}</p>
              <p style={{ ...styles.postStatus, ...getStatusStyle(question.questionStatus) }}>
                            상태: {question.questionStatus || '알 수 없음'}
                        </p>
            </Link>
          </div>
        ))}
<button onClick={handleNewQuestion} >
        문의하기
      </button>
            </div>
    );
};
const styles = {
    postCard: {
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      margin: '10px 0',
      textDecoration: 'none',
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    postTitle: {
      fontSize: '18px',
      margin: '0',
    },
    postAuthor: {
      color: '#555',
    },
    postContent: {
      margin: '5px 0',
    },
    postStatus: {
      fontStyle: 'italic',
      color: '#888',
    },
  };

export default ListQuestions;