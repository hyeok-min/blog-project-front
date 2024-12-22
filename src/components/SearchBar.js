import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchBar = ({setViewingBlogger,setViewingboard,setViewingfolder}) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // 사용자가 입력한 검색어에 맞는 추천을 가져오는 함수
    const fetchSuggestions = async (query) => {
        if (query.trim().length > 0) {
            try {
                const response = await axios.get(`/api/board/search?query=${query}`);
                setSuggestions(response.data); // 추천 게시글 목록을 상태에 저장
                console.table(response);
            } catch (error) {
                console.error('검색 오류:', error);
            }
        } else {
            setSuggestions([]); // 검색어가 없으면 추천 목록을 초기화
        }
    };

    // 검색어가 변경될 때마다 서버에서 추천 목록을 가져옴
    useEffect(() => {
        fetchSuggestions(query);
    }, [query]);

   
    const handleSuggestionClick = (name,id,folder) => {
        setViewingBlogger(name);  // 클릭된 항목에 맞게 viewingBlogger를 업데이트
        setViewingboard(id);
        setViewingfolder(folder);
        setQuery('');
    };

    return (
        <div style={searchBarContainerStyle}>
            <div style={searchBarStyle}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // 입력값 변경 시 상태 업데이트
                    placeholder="검색어를 입력하세요..."
                    style={inputStyle}
                />
            </div>
            {suggestions.length > 0 && (
                <ul style={suggestionListStyle}>
                    {suggestions.map((post) => (
                        <li key={post.id} style={suggestionItemStyle}>
                           <Link to={`${post.name}/${post.folderName}/${post.id}`} style={linkStyle} onClick={() => handleSuggestionClick(post.name,post.id,post.folderName)}>
                            {post.title}
                        </Link>
                        </li>   
                    ))}
                </ul>
            )}
        </div>
    );
};

// 검색창 컨테이너 스타일 (전체 레이아웃을 감싸는 부분)
const searchBarContainerStyle = {
    width: '250px', // 사이드바와 동일한 너비로 설정 (예: 250px)
    margin: '0 auto', // 가운데 정렬
    position: 'relative', // 추천 리스트를 절대 위치로 배치하기 위해 설정
    padding: '10px',
};

// 검색창 스타일
const searchBarStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px', // 입력창과 추천 목록 사이의 간격
};

// 검색창 스타일
const inputStyle = {
    padding: '12px 15px',
    width: '100%', // 100%로 넓이 확장
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border 0.3s ease', // 테두리 색상이 바뀌는 효과 추가
};

// 추천 검색어 리스트 스타일
const suggestionListStyle = {
    position: 'absolute',
    top: '50px', // 검색창 아래에 위치하도록 설정
    left: 0,
    width: '100%', // 100% 너비로 확장 (사이드바 크기와 일치)
    maxHeight: '200px', // 리스트 최대 높이
    overflowY: 'auto', // 스크롤 가능
    padding: '0',
    listStyleType: 'none',
    margin: 0,
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000, // 다른 요소들 위에 표시되도록
};

// 추천 항목 스타일
const suggestionItemStyle = {
    padding: '10px 15px',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '14px',
    color: '#333',
};

// 추천 항목에 마우스를 올렸을 때의 스타일
const suggestionItemHoverStyle = {
    backgroundColor: '#f0f0f0',
};

// 링크 스타일
const linkStyle = {
    textDecoration: 'none',
    color: '#007bff', // 파란색으로 링크 색상 설정
};

// 검색창에 포커스가 있을 때 테두리 색상 변경
const inputFocusStyle = {
    border: '1px solid #007bff', // 포커스 시 파란색 테두리
};

export default SearchBar;