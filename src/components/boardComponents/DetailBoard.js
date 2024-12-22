import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {fetchBoard,deleteBoard} from '../../api/boardApi';
import {fetchComments,createComment,createReply} from '../../api/commentApi';

const BoardDetail = ({user,folder,viewingboardid,username,loggedInUser}) => {
    const [board, setBoard] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setNewComment] = useState('');
    const [reply, setNewReply] = useState({});
    const [replyVisible, setReplyVisible] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoards = async () => {
            console.log("boardone in ====");
            console.log(`board user: ${user}, folder: ${folder}, viewingboardid: ${viewingboardid}, username: ${username}`);
            const response = await fetchBoard(user,folder,viewingboardid);
            console.log(response);
            console.table(response);
            setBoard(response);
            console.log("comment in ====");
            const commentsResponse = await fetchComments(viewingboardid);
            console.log(commentsResponse);
            setComments(commentsResponse);
        };
        fetchBoards();
    }, [user,folder,viewingboardid]);

    if (!board) return <div>로딩 중...</div>;

    const isAuthor = username === board.name; //{user,folder,viewingboardid} 여기에 로그인 사용자 추가해야해
    const handleDelete = async () => {
        const confirmed = window.confirm("해당 게시글을 삭제하시겠습니까?");
        if (confirmed) {
        try {
            console.log("delete board  try");
          const data = await deleteBoard(viewingboardid,username,folder); 
          alert("게시글이 삭제되었습니다.");
        navigate(-1);
          console.log("delete board try[end]");
        } catch (error) {
            console.log("delete board  catch");
          alert(error.message);
        }
    }
      };
      const handleUpdate = async()=>{
        console.log("update");
        navigate(`/${username}/${folder}/${viewingboardid}/update`);
        console.log("update out");
      }

      //댓글 핸들러
      const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return; // 빈 댓글 방지
        console.log("===comment create===");
        try {
            console.log("===comment create=== try");
            console.log("===comment create=== newcomment : "+comment);
            
           const commentdata = comment;
            console.table(commentdata);

           await createComment(commentdata,username,folder,viewingboardid);
            console.log("===comment create=== api out");
            const commentsResponse = await fetchComments(viewingboardid);
            setComments(commentsResponse);
            setNewComment(''); // 입력창 비우기

        } catch (error) {
            alert(error.message);
        }
    };


    const handleReplyChange = (commentId, value) => {
        setNewReply({ ...reply, [commentId]: value });
    };

    //대댓글 제출
    const handleReplySubmit = async (e, commentId) => {
        e.preventDefault();
        const replyText = reply[commentId];
        if (!replyText.trim()) return;

        try {
            await createReply(replyText, username, folder, viewingboardid, commentId);
            const commentsResponse = await fetchComments(viewingboardid);
            setComments(commentsResponse);
            setNewReply({ ...reply, [commentId]: '' });
            setReplyVisible({ ...replyVisible, [commentId]: false });
        } catch (error) {
            alert(error.message);
        }
    };

    //대댓글 토글 
    const toggleReplyVisibility = (commentId) => {
        setReplyVisible({ ...replyVisible, [commentId]: !replyVisible[commentId] });
    };


    return (
        <div style={containerStyle}>
      
        <h1 style={headerStyle}>제목 : {board.title}</h1> 
        <p>게시일 : {board.lastModifiedDate}</p>
       
        
        <p>작성자 : <a href={`/${board.name}`} style={{textDecoration:'none'}}>{board.name}</a></p>
        <p>카테고리 : {board.folderName}</p>
        <p>조회수 : {board.view}</p>
        <div style={{ marginTop: '30px' }}></div>
        <div style={commentsSectionStyle} dangerouslySetInnerHTML={{ __html: board.content }} />

        {/* 수정 및 삭제 버튼 조건부 렌더링 */}
        {isAuthor && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop:'15px' }}>
                <button style={buttonStyle} onClick={handleUpdate}>게시물 수정</button>
                <button style={buttonStyle} onClick={handleDelete}>게시물 삭제</button>
            </div>
        )}

        {/* 댓글 입력 */}
        {
            loggedInUser === '' ? (
                <h2>로그인시 댓글 작성이 가능합니다.</h2>
            ) : (
                <form onSubmit={handleCommentSubmit} style={{ marginTop: '40px' }}>
                <textarea
                    value={comment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    required
                    style={textareaStyle}
                />
              <button type="submit" style={buttonStyle}>댓글 작성</button>
            </form>
            )
        }
        {/* 댓글 목록 */}
        <div style={commentsSectionStyle}>
            <h2>댓글</h2>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id}  >
                         {console.log(`댓글 ID: ${comment.id}, 부모 ID: ${comment.commentParentId}, 순서: ${comment.comment_order}`)} {/* 디버깅 로그 */}

                        {Number(comment.comment_order) === 0 ? ( // 부모 댓글
                    <div style={{ ...commentStyle, margin: 0, padding: '10px 0' }}>
                    <p style={{ margin: 0 }}>
                        <strong>{comment.name}</strong> : {comment.comment}  
                        <button style={{ marginLeft: '10px' }} onClick={() => toggleReplyVisibility(comment.id)}>
                            댓글 작성
                        </button>
                    </p>
                   
                    {replyVisible[comment.id] && (
                        <form onSubmit={(e) => handleReplySubmit(e, comment.id)} style={{ marginTop: '10px' }}>
                            <textarea
                                value={reply[comment.id] || ''}
                                onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                                placeholder="대댓글을 입력하세요..."
                                required
                                style={textareaStyle}
                            />
                            <button type="submit" style={buttonStyle}>대댓글 작성</button>
                        </form>
                    )}
                    
                </div>
            ) : null}
            {/* 대댓글 렌더링 */}
            {comments
                        .filter(c => Number(c.commentParentId) === comment.id) // 대댓글 필터링
                        .map(reply => (
                            <p key={reply.id} style={{ marginLeft: '20px', padding: '0', marginTop: 0  }}>
                                <strong>ㄴ {reply.name}</strong> : {reply.comment}
                            </p>
            ))}
        </div>
    ))) :  (
                <p>댓글이 없습니다.</p>
            )}
        </div>
    </div>
    );
};
const containerStyle = {
    backgroundColor: '#1e1e1e', // 어두운 배경
    color: '#f0f0f0', // 밝은 글씨 색상
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #444',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const headerStyle = {
    marginBottom: '10px',
};

const buttonStyle = {
    backgroundColor: '#007bff', // 버튼 색상
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
};

const textareaStyle = {
    width: '100%',
    height: '100px',
    borderRadius: '5px',
    padding: '10px',
    border: '1px solid #444',
    backgroundColor: '#333',
    color: '#f0f0f0',
};

const commentsSectionStyle = {
    backgroundColor: '#2c2c2c', // 댓글 섹션 배경
    padding: '15px',
    borderRadius: '8px',
    marginTop: '20px',
};

const commentStyle = {
    borderTop: '1px solid #444', // 댓글 구분선
    padding: '10px 0',
};

export default BoardDetail;