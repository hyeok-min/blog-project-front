import axios from 'axios';

//사용자 본인 문의글 리스트
export const QuestionList = async (user) => {
    try {
        const response = await axios.get(`/api/question/${user}`);
        console.log(response);
        return response;
        }
    catch (error) {
        throw error; 
    }
};
//문의 답변을 위한 관리자용 문의글 리스트
export const QuestionAdminList = async () => {
    try {
        const response = await axios.get(`/api/question/admin`);
        console.log(response);
        return response;
        }
    catch (error) {
        throw error; 
    }
};

//문의글 작성
export const CreateQuestion = async (user,question) => {
        const response = await axios.post(`/api/question/${user}/new`,question,{
            withCredentials: true
        });
        return response.data;
};

//사용자용 문의글 보기
export const DetailQuestion = async (user,id) => {
    const response = await axios.get(`/api/question/${user}/${id}`,{
        withCredentials: true
    });
    return response.data;
};

//관리자용 문의글 보기
export const DetailQuestionAdmin = async (id) => {
    const response = await axios.get(`/api/question/admin/${id}`,{
        withCredentials: true
    });
    return response.data;
};

//문의글 답변 작성
export const AnswerQuestionAdmin = async (id,answer) => {
    const response = await axios.post(`/api/question/admin/answer/${id}`, { answer: answer },{
        withCredentials: true
    });
    console.log(response);
    return response;
};

//문의글 삭제
export const DeleteQuestion = async (user,id) => {
    await axios.delete(`/api/question/${user}/${id}/delete`);
};