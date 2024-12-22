import axios from 'axios';

//로그인
export const loginUser = async (user) => {
    console.log("Email before login request:", user.email);
    console.log("passwd before login request:", user.passWord);
    try {
        const response = await axios.post(`/api/user/login`, {
            email: user.email, // 이메일
            passWord: user.passWord // 비밀번호
        }, {
            withCredentials: true // 쿠키 전송을 위해
        });
        return response; // 응답 데이터 반환
    } catch (error) {
        throw error; // 에러를 던져서 호출하는 곳에서 처리
    }
};

//회원가입
export const CreateUser = async (user) => {
    try {
        const response = await axios.post(`/api/user/createUser`, {
            email: user.email, // 이메일
            nickName: user.nickName,
            passWord: user.passWord,
        }, {
            withCredentials: true // 쿠키 전송을 위해
        });
        return response.data; // 응답 데이터 반환
    } catch (error) {
        throw error; // 에러를 던져서 호출하는 곳에서 처리
    }
};

//로그아웃
export const LogOut = async () => {
    try {
        const response = await axios.post(`/api/logout`);
        console.log(response);
        return response;
        }
    catch (error) {
        throw error; // 에러를 던져서 호출하는 곳에서 처리
    }
};

//사용자 정보 변경
export const updateUser = async (username, newInfo) => {
  try {
    const response = await axios.put(`/api/user/${username}/update`,newInfo ,{
      withCredentials: true, // 쿠키 전송을 위해
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 에러를 던져서 호출하는 곳에서 처리
  }
};

//회원 탈퇴
  export const deleteUser = async (username) => {
    try {
      const response = await axios.delete(`/api/user/${username}/delete`, {
        withCredentials: true, // 쿠키 전송을 위해
      });
      return response.data; // 응답 데이터 반환
    } catch (error) {
      throw error; // 에러를 던져서 호출하는 곳에서 처리
    }
  };

  //사용자 정보
  export const userInfo = async (username) => {
    try {
        const response = await axios.get(`/api/${username}`, {
            withCredentials: true // 쿠키 전송을 위해
        });
        console.log(response);
        return response;
        }
    catch (error) {
        throw error; // 에러를 던져서 호출하는 곳에서 처리
    }
};