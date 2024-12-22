import React, { useState, useEffect  } from 'react';
import { fetchFolders,createBoard} from '../../api/boardApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBoard = ({username}) => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [folder, setFolder] = useState('');
    const [folders, setFolders] = useState([]); // 폴더 옵션 저장
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const folderName = folder;
        const newBoard = { name, title, content, folderName };
        try {
            console.log("submit try");
            console.log(newBoard);
          const datas =await createBoard(newBoard,username,folder);
          console.log("new board submit=="+datas);
          console.table(datas);
          console.log("submit try[end]");
        } catch (error) {
            console.log("submit catch");
          alert(error.message);
        }
        
       navigate(`/${username}/${folder}`);
    };
    useEffect(() => {
        // 폴더 목록 가져오기 (실제 API 호출로 대체)
        const fetchFoldersFromApi = async () => {
            try {
                console.log("loadfolder try");
              const data = await fetchFolders(username); // 특정 블로거의 폴더를 가져옴
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
    return (
        <div className="container" style={modalStyle}>
            <h1>게시글 작성</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>작성자:</label>
                    <input
                        type="text"
                        value={username}
                        readOnly
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>제목:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>카테고리 선택:</label>
                    <select
                        value={folder}
                        onChange={(e) => setFolder(e.target.value)}
                        required
                    >
                        <option value="">카테고리 선택</option>
                        {folders.map((folder) => (
                            <option key={folder.id} value={folder.folderName}>
                                {folder.folderName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">게시글 등록</button>
            </form>
        </div>
    );
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
export default CreateBoard;