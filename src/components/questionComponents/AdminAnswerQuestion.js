import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import {DetailQuestionAdmin,AnswerQuestionAdmin} from '../../api/questionApi';

const AnswerQuestions = () => {
    const [Question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(''); // 답변을 관리하는 상태
    const { id } = useParams(); // URL에서 id 가져오기
    const navigate = useNavigate();
    useEffect(() => {
        const fetchQuestion = async () => {
            console.log("question detail in ====");
            console.log("question detail name ====");
            const response = await DetailQuestionAdmin(id);
            console.log(response);
            console.table(response);
            setQuestion(response);
        };
        fetchQuestion();
    }, [id]);

// 답변을 서버로 전송하는 함수
const handleAnswerSubmit = async (e) => {
  e.preventDefault(); // 기본 폼 제출 동작을 막음
  console.log(answer);
  if (!answer.trim()) {
    alert('답변을 작성해주세요.');
    return;
  }

  try {
    // 답변 제출 API 호출
    console.log("====api in ");
    const response = await AnswerQuestionAdmin(id, answer);
    console.log(response.status);
    
    // 서버에서 답변 처리가 성공적으로 되었으면
    if (response.status===200) {
      alert('답변이 성공적으로 제출되었습니다.');
      setAnswer(''); // 답변 입력 필드 초기화
      window.location.reload();  // 페이지를 새로고침
    } else {
      alert('답변 제출에 실패했습니다.');
    }
  } catch (error) {
    console.error('답변 제출 오류:', error);
    alert('답변 제출 중 오류가 발생했습니다.');
  }
};

    if (!Question) {
        return <p>로딩 중...</p>;
      }

    const handleClose = () => {
        navigate(-1);
    };
    
    return (
        <div style={styles.container}>
        <h2 style={styles.title}>문의 제목 : {Question.title}</h2>
        <p style={styles.content}><strong>내용:</strong> {Question.content}</p>
        <p style={styles.status}><strong>문의 상태:</strong> {Question.questionStatus}</p>
        {Question.answer && (
          <div style={styles.response}>
            <h3>답변 내용:</h3>
            <p>{Question.answer}</p>
          </div>
        )}

        {/* 답변 입력 폼 */}
      <div style={styles.answerSection}>
        <h3>답변 작성:</h3>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="답변을 입력해주세요."
          style={styles.textarea}
        />
        <div>
          <button style={styles.submitButton} onClick={handleAnswerSubmit}>
            답변 제출
          </button>
        </div>
      </div>

        <div>
        <button type="button" onClick={handleClose}>뒤로가기</button>
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

export default AnswerQuestions;