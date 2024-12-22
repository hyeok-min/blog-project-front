import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import {DetailQuestion,DeleteQuestion} from '../../api/questionApi';

const DetailQuestions = ({user}) => {
    const [Question, setQuestion] = useState(null);
    const { id } = useParams(); // URL에서 id 가져오기
    const navigate = useNavigate();
    useEffect(() => {
        const fetchQuestion = async () => {
            console.log("question detail in ====");
            const response = await DetailQuestion(user,id);
            console.log(response);
            console.table(response);
            setQuestion(response);
        };
        fetchQuestion();
    }, [user,id]);

    if (!Question) {
        return <p>로딩 중...</p>;
      }

    const handleClose = () => {
        navigate(-1);
    };
    const handleDelete = async() => {
      const confirmed = window.confirm("해당 문의글을 삭제하시겠습니까?");
      if (confirmed) {
      try {
          console.log("question delete try");
        await DeleteQuestion(user,id); 
        alert("문의글이 삭제되었습니다.");
      navigate(-1);
        console.log("delete question try[end]");
      } catch (error) {
          console.log("delete question catch");
        alert(error.message);
      }
    }
  };
    return (
        <div style={styles.container}>
        <h2 style={styles.title}>문의 제목 : {Question.title}</h2>
        <p style={styles.content}><strong>내용:</strong> {Question.content}</p>
        <p style={{...styles.status, ...getStatusStyle(Question.questionStatus)}}><strong>문의 상태:</strong> {Question.questionStatus}</p>
        {Question.answer && (
          <div style={styles.response}>
            <h3>답변 내용:</h3>
            <p>{Question.answer}</p>
          </div>
        )}<div>
        <button type="button" onClick={handleClose}>뒤로가기</button>
        <button type="button" onClick={handleDelete}>삭제하기</button>
        </div>
      </div>
      
    );
};
const styles = {
    container: {
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '20px',
      margin: '20px',
      backgroundColor: '#f9f9f9',
    },
    title: {
      color: '#333',
    },
    content: {
      marginBottom: '10px',
    },
    status: {
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    response: {
      marginTop: '20px',
      borderTop: '1px solid #ddd',
      paddingTop: '10px',
    },
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

export default DetailQuestions;