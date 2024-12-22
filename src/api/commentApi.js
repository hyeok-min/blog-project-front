import axios from 'axios';

//댓글 조회
export const fetchComments = async (id) => {
    const response = await axios.get(`/api/comment/${id}`);
    return response.data;
};

//댓글 생성
export const createComment = async (commentData,user,folderName,id) => {
    console.log("======createcomment api in createdata === : ");
    const response = await axios.post(`/api/comment/${user}/${folderName}/${id}`, { comment: commentData }, {
        withCredentials: true
    });
    return response.data;
};
//대댓글 생성
export const createReply = async (commentData,user,folderName,id,commentId) => {
    console.log("======createcomment api in createdata === : "+commentData);
    console.log(commentData,user,folderName,id,commentId);
    const response = await axios.post(`/api/comment/${user}/${folderName}/${id}/reply`, { comment: commentData,commentParentId :commentId }, {
        withCredentials: true
    });
    return response.data;
};
//댓글 삭제
export const deleteComment = async (id,user,folder) => {
    await axios.delete(`/api/comment/${user}/${folder}/${id}/delete`, {
        withCredentials: true
    });
};