import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {QuestionAdminList} from '../../api/questionApi';


const ListAdminQuestions = ({username}) => {
    const [Questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchQuestion = async () => {
            
            try{
            const response = await QuestionAdminList();
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
            <h1>문의 답변 게시판</h1>
            
            {Questions.map(question => (
          <div key={question.id} style={styles.postCard}>
            <Link to={`/admin/question/${question.id}`} style={styles.link}>
              <h3 style={styles.postTitle}>제목 : {question.title}</h3>
              <p style={styles.postContent}>내용 : {question.content}</p>
              <p style={styles.postContent}>아이디 : {question.writer}</p>
              <p style={{ ...styles.postStatus, ...getStatusStyle(question.questionStatus) }}>
                            상태: {question.questionStatus || '알 수 없음'}
                        </p>
            </Link>
          </div>
        ))}
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

export default ListAdminQuestions;