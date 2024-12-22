import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {fetchBoard,updateBoard,fetchFolders} from '../../api/boardApi';
import { useNavigate } from 'react-router-dom';

const UpdateBoard = ({user,folder,viewingboardid,username}) => {
    const [board, setBoard] = useState(null);
    const [folderName, setFolder] = useState('');
    const [folders, setFolders] = useState([]);
    const [title, setUpdatedTitle] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [content, setUpdatedContent] = useState('');
    const [boardUpdateCount, setUpdateCount] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchBoards = async () => {
            console.log("boardone in ====");
            const response = await fetchBoard(user,folder,viewingboardid);
            console.log(response);
            console.table(response);
            setBoard(response);

            setUpdatedTitle(response.title);
            setUpdatedName(response.name);
            setUpdatedContent(response.content);
            setUpdateCount(response.boardUpdateCount);
        };
        fetchBoards();

         const fetchFoldersFromApi = async () => {
        try {
            console.log("loadfolder try");
          const data = await fetchFolders(username);
          setFolders(data);
          console.log("new board folders=="+data);
          console.table(data);
          console.log("loadfolder try[end]");
        } catch (error) {
            console.log("loadfolder catch");
          alert(error.message);
        }
    };
    fetchFoldersFromApi();

    }, []);

    ///수정 필요
 const handleUpdate = async () => {
    if (folderName === '') {
        alert('카테고리를 선택해주세요');
        return; // 카테고리가 선택되지 않았으면 업데이트를 막음
    }
    try {
        const updateBoards = { title, content, boardUpdateCount,folderName };
        console.log("updateBoard board  try");
      await updateBoard(viewingboardid,folder,username,updateBoards); 
      console.log("updateBoard board try[end]");
      navigate(-1);
    } catch (error) {
        console.log("updateBoard board  catch");
      alert(error.message);
    }
  };   

    if (!board) return <div>로딩 중...</div>;
   

    return (
        <div className="container">
            <h1>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setUpdatedTitle(e.target.value)} 
                />
            </h1>
            <p>
                작성자: 
                <input 
                    type="text" 
                    value={updatedName} 
                    readOnly
                    onChange={(e) => setUpdatedName(e.target.value)} 
                />
            </p>
            <p>
                카테고리: 
                <select
                        value={folderName}
                        onChange={(e) =>
                             setFolder(e.target.value)}
                        required
                    >
                        <option value="">카테고리 선택</option>
                        {folders.map((folderName) => (
                            <option key={folderName.id} value={folderName.folderName}>
                                {folderName.folderName}
                            </option>
                        ))}
                    </select>
            </p>
            <div>
                <textarea 
                    value={content} 
                    onChange={(e) => setUpdatedContent(e.target.value)} 
                    rows="5" 
                    cols="50" 
                />
            </div>
            <div>
                <button className="btn" onClick={handleUpdate}>저장하기</button>
            </div>
        </div>
    );
};

export default UpdateBoard;