import { fetchFolders, createFolder,deleteFolder } from '../api/boardApi';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // react-router-dom에서 useHistory 임포트

const Sidebar = ({ viewingBlogger,loggedInUser,setViewingfolder,setViewingBlogger }) => {
    const [folders, setFolders] = useState([]);
    const [newFolderName, setNewFolderName] = useState('');
    const [isCreatingFolder, setIsCreatingFolder] = useState(false); // 폴더 생성 입력 필드 보이기
    const navigate = useNavigate();


    // 폴더 생성 함수
    const handleCreateFolder = async () => {
        console.log("===folder create in");
        if (!newFolderName) return;

        try {
            console.log("===folder try in");
            await createFolder(viewingBlogger,newFolderName);
            console.log("===folder api out");
             setNewFolderName('');
            loadFolders(); // 새 폴더 생성 후 폴더 목록 갱신
        } catch (error) {
            alert(error.message);
        }
    };

    // 특정 블로거의 폴더 목록을 가져오는 함수
  const loadFolders = async () => {
    if (!viewingBlogger){
        console.log("!viewingblogger in == ");
        return; // 블로거가 없으면 종료
    } 

    try {
        console.log("loadfolder try = viewingbolgger : "+viewingBlogger);
      const data = await fetchFolders(viewingBlogger); // 특정 블로거의 폴더를 가져옴
      setFolders(data);
      console.log("folders=="+folders);
      console.table(folders);
      console.log("loadfolder try[end]");
    } catch (error) {
        console.log("loadfolder catch");
      alert(error.message);
    }
  };
  //폴더 클릭시 해당 폴더 게시글들 리스트로감(아직 안됨)
  const handleFolderClick = (folderName,viewingBlogger) => {
    try{
        // const username = loggedInUser; // 실제 사용자 이름으로 변경
     setViewingfolder(folderName);
    console.log("setviewingfolder = "+folderName);
    navigate(`/${viewingBlogger}/${folderName}`);
    }catch(error){
        console.log("folder catch");
        alert("해당 폴더의 게시물이 존재하지 않습니다."+error.message);
    }
    
  };

   // 폴더 삭제 함수
   const handleDeleteFolder = async (folderName) => {
    if (window.confirm(`${folderName} 폴더를 정말 삭제하시겠습니까?`)) {
      try {
        await deleteFolder(viewingBlogger, folderName);
        loadFolders(); // 폴더 삭제 후 목록 갱신
      } catch (error) {
        alert(error.message);
      }
    }
  };


  // watchingBlogger가 바뀔 때마다 폴더 목록을 다시 가져옴
  useEffect(() => {
    console.log("folderList effect : "+viewingBlogger+"===="+loggedInUser);
    // setViewingBlogger();
    loadFolders();
  }, [viewingBlogger]);

    return (
        <aside style={sidebarStyle}>
            <h3 style={blogerName}>{viewingBlogger ? `${viewingBlogger}님의 블로그 입니다.` : '블로그를 방문해 보세요.'}</h3>
            {viewingBlogger && (
                <>
                    <h3 style={headingStyle}>Categories</h3>
                    <ul style={headingStyle}>
                        {/* {folders.map((folder) => (
                            <li key={folder.id}  onClick={() => handleFolderClick(folder.folderName)}>{folder.folderName}</li>
                        ))} */}

{folders.map((folder) => (
              <li key={folder.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span onClick={() => handleFolderClick(folder.folderName,viewingBlogger)}>{folder.folderName}</span>
                  {viewingBlogger === loggedInUser && (
                    <button
                      onClick={() => handleDeleteFolder(folder.folderName)}
                      style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </li>
            ))}
                    </ul>
                </>
            )}
           
            {viewingBlogger && loggedInUser && viewingBlogger === loggedInUser && (
                <div style={{ marginTop: '20px' }}>
                    
                    {isCreatingFolder && (
                        <div style={{ display: 'flex', marginTop: '10px' , marginBottom: '20px'}}>
                            <input
                                type="text"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                placeholder="새 폴더 이름"
                                style={{ padding: '5px', marginRight: '10px' }}
                            />
                            <button style={ButtonStyle} onClick={handleCreateFolder}>등록</button>
                        </div>
                    )}
<div  style={{ display: 'flex', gap: 7 }}>
    <button style={ButtonStyle} onClick={() => setIsCreatingFolder(!isCreatingFolder)}>
                        {isCreatingFolder ? '생성 취소' : '폴더 생성'}
                    </button>

</div>

                </div>

                
            )}
        </aside>
    );
};


{/* <div style={{ display: 'flex', gap: 15 }}>
                    <button style={ButtonStyle}>폴더 생성</button>
                    <button style={ButtonStyle} onClick={handleCreateFolder}>게시글 생성</button>
                </div> */}

const ButtonStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    margin : 0,
};
const sidebarStyle = {
    width: '250px',
    backgroundColor: '#333',
    padding: '20px',
    position: 'sticky', // 스크롤에 따라 위치 고정
    top: '50px', // 상단에서 20px 떨어진 위치
    // height: 'fit-content', // 내용에 맞춰 높이 조정s
};

const headingStyle = {// 글씨 색상
    color: '#fff', 
};

const blogerName = {// 블로거 이름 색상 글자는 6글자가 적당.
    fontSize: '1rem',
    color: '#A0C4FF ', 
};

export default Sidebar;