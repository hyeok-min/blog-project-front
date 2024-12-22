import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {CreateQuestion} from '../../api/questionApi';

const WriteQuestion = ({ username }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionItem = {
      title,content
    }
    try{
      console.log("question questionItem"+questionItem);
      const response = await CreateQuestion(username,questionItem);
      console.log("question title"+title);
      console.log("question content"+content);
      console.log("question response"+response);
      console.log("new question submit=="+response);
      console.table(response);
      console.log("submit try[end]");
       // 성공적으로 질문을 작성한 후에 목록 페이지로 이동
    navigate(`/${username}/question`);
      } catch (err) {
        console.error("Error create questions: ", err);
      } 
    console.log('제목:', title);
    console.log('내용:', content);

   
  };

  return (
    <div className="board-container">
      <h1 style={{color:'white'}}>문의 사항 작성</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>제목:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>내용:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          작성하기
        </button>
      </form>
    </div>
  );
};

const styles = {
  formGroup: {
    margin: '10px 0',
  },
  label: {
    color : 'white',
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    minHeight: '100px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
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

export default WriteQuestion;