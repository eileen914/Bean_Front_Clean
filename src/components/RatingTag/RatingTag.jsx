// 카페 태그/평점 드롭다운 컴포넌트
// - 태그 선택, 드롭다운 UI, 선택 이벤트 핸들러 등

import React, { useState } from "react";
import "./RatingTag.css";
import downarrow from "../../assets/arrow_down.svg";

// 드롭다운 옵션(태그, 평점, 리뷰수)
const options = [
  { label: "#카공", rating: 4.8, count: 732 },
  { label: "#조용", rating: 4.5, count: 612 },
  { label: "#데이트", rating: 4.6, count: 847 },
  { label: "#대화", rating: 4.2, count: 514 },
  { label: "#사진", rating: 4.9, count: 1067 },
  { label: "#힐링", rating: 4.7, count: 420 },
  { label: "#팀플", rating: 4.3, count: 389 },
];

const RatingTag = ({ onSelect }) => {
  // 드롭다운 열림/닫힘 상태
  const [isOpen, setIsOpen] = useState(false);
  // 선택된 태그
  const [selected, setSelected] = useState("# 카공");

  // 드롭다운 토글 핸들러
  const toggleDropdown = () => setIsOpen(!isOpen);
  // 태그 선택 핸들러
  const handleSelect = (option) => {
    setSelected(option.label);
    setIsOpen(false);
    if (onSelect) onSelect(option); // option 전체를 전달
  };

  return (
    <div className="rate-dropdown-menu">
      {/* 드롭다운 헤더 */}
      <div className="rate-dropdown-header" onClick={toggleDropdown}>
        <span>{selected}</span>
        <img src={downarrow} alt="arrow" />
      </div>
      {/* 드롭다운 옵션 리스트 */}
      {isOpen && (
        <div className="rate-dropdown-options">
          {options.map((option) => (
            <div
              key={option.label}
              className={`rate-dropdown-option ${option.label === selected ? "selected" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatingTag;