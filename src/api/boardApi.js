import axios from 'axios';

//게시글 리스트 조회
export const fetchBoards = async (user,folder) => {
    console.log("user : "+user+" folder : "+folder);
    const response = await axios.get(`/api/board/${user}/${folder}`);
    return response.data;
};

//게시글 리스트 조회(특정블로거)
export const fetchBoardsUser = async (user) => {
    const response = await axios.get(`/api/board/${user}`);
    return response.data;
};

//게시글 리스트 조회(모든 블로거)
export const fetchBoardsAll = async () => {
    const response = await axios.get(`/api/board/all`);
    return response.data;
};

//게시글 단건 조회
export const fetchBoard = async (user,folder,id) => {
    const response = await axios.get(`/api/board/${user}/${folder}/${id}`);
    return response.data;
};

//생성
export const createBoard = async (boardData,user,folderName) => {
    const response = await axios.post(`/api/board/${user}/${folderName}`, boardData, {
        withCredentials: true, 
      });
    return response.data;
};

//수정
export const updateBoard = async (id,folder,user, boardData) => {
    const response = await axios.put(`/api/board/${user}/${folder}/${id}/update`, boardData, {
        withCredentials: true, 
      });
    return response.data;
};

//삭제
export const deleteBoard = async (id,user,folder) => {
    await axios.delete(`/api/board/${user}/${folder}/${id}/delete`);
};


// 폴더 목록 가져오기
export const fetchFolders = async (user) => {
    const response = await axios.get(`/api/board/${user}/folderList`);
    console.log("folder status"+response.status);
    if (response.status !== 200) {
        console.log("folder response not ok");
        throw new Error('폴더를 가져오는 데 실패했습니다.');
    }
    return response.data;
};

// 폴더 생성
export const createFolder = async (user,folderNames) => {
    console.log("folder create");
    const response = await axios.post(`/api/board/${user}/folderCreate`, { folderName: folderNames });
      console.log("folder create end");
    return response.data; 
};

//폴더 삭제
export const deleteFolder = async (user,folderNames) => {
    const response = await axios.delete(`/api/board/${user}/${folderNames}/delete`, {
        withCredentials: true, 
      });
      console.log("folder delete end");
};