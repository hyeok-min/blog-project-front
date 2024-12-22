import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Login from './components/userComponents/Login';
import Create from './components/userComponents/Create';
import UpdateAndDelete from './components/userComponents/UpdateAndDelete';
import Home from './components/homeComponents/home';
import UserHome from './components/homeComponents/UserHome';
import Update from './components/userComponents/Update';
import CreateBoard from './components/boardComponents/CreateBoard';
import ListBoard from './components/boardComponents/ListBoard';
import DetailBoard from './components/boardComponents/DetailBoard';
import UpdateBoard from './components/boardComponents/UpdateBoard';
import ListQuestions from './components/questionComponents/ListQuestions';
import WriteQuestion from  './components/questionComponents/WriteQuestion';
import DetailQuestion from  './components/questionComponents/DetailQuestion';
import ListAdminQuestions from  './components/questionComponents/AdminListQuestions';
import AnswerQuestions from './components/questionComponents/AdminAnswerQuestion';

const App = () => {
  const [username, setUsername] = useState(''); // 사용자 이름 
  const [viewingBlogger, setViewingBlogger] = useState(''); // 보고있는 블로거 이름
  const [viewingfolder, setViewingfolder] = useState(''); // 보고있는 폴더 이름
  const [viewingboard, setViewingboard] = useState(''); // 보고있는 게시글 상태
  const [userRole,setUserRole] =  useState(''); // 사용자 상태(관리자,유저)
    console.log("로그인 상태 확인",username);
    console.log("현재 보는 블로거", viewingBlogger);
    return (
      <Router>
        <Header username={username} setUsername={setUsername} setViewingBlogger={setViewingBlogger} setViewingboard={setViewingboard} setViewingfolder={setViewingfolder} userRole={userRole} />
        <div style={containerStyle}>
        <SideBar viewingBlogger={viewingBlogger} loggedInUser={username} setViewingfolder={setViewingfolder} setViewingBlogger={setViewingBlogger}/>
        <div style={mainStyle}>
        <Routes >

          <Route path="/" element={<Home setViewingBlogger={setViewingBlogger} setViewingboard={setViewingboard} setViewingfolder={setViewingfolder}/>} /> 

          {/* //회원관리 */}
          <Route path="/login" element={<Login setUsername={setUsername} setViewingBlogger={setViewingBlogger} setUserRole={setUserRole}/>}/>
          <Route path="/:username/modify" element={<UpdateAndDelete username={username} setUsername={setUsername}/>} />
          <Route path="/create" element={<Create/>}/>
          <Route path="/:username/update" element={<Update username={username} setUsername={setUsername}/>} />
          <Route path="/:username" element={<UserHome viewingBlogger={viewingBlogger} />} />
          {/* 게시판 */}
          <Route path="/:username/create" element={<CreateBoard username={username}/>} />

          <Route path="/:username/:viewingfolder" element={<ListBoard username={username} user={viewingBlogger} folder={viewingfolder} setViewingboard={setViewingboard}/>} />
          
          <Route path="/:username/:viewingfolder/:viewingboard" element={<DetailBoard user={viewingBlogger} folder={viewingfolder} viewingboardid={viewingboard} username={username} loggedInUser={username}/>} />
          <Route path="/:username/:viewingfolder/:viewingboard/update" element={<UpdateBoard user={viewingBlogger} folder={viewingfolder} viewingboardid={viewingboard} username={username}/>} />
          {/* 문의 */}
          <Route path="/:username/question" element={<ListQuestions username={username}/>} />
          <Route path="/:username/question/new" element={<WriteQuestion username={username}/>} />
          <Route path="/:username/question/:id" element={<DetailQuestion user={username}/>} />
          <Route path="/admin/questionList" element={<ListAdminQuestions/>} />
          <Route path="/admin/question/:id" element={<AnswerQuestions/>} />
          
        </Routes >
        </div>
        </div>
      </Router>
    );
  };
  const containerStyle = {
    display: 'flex', // Flexbox로 레이아웃 조정
    backgroundColor: '#222', // 어두운 배경색
    minHeight: '100vh', // 최소 높이를 전체 화면으로 설정
};

const mainStyle = {
    flex: 1, // 남은 공간을 차지하도록 설정
    padding: '20px', // 필요한 패딩 설정
};
export default App;