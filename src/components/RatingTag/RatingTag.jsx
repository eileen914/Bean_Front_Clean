import React, { useState } from "react";
import "./RatingTag.css";
import downarrow from "../../assets/arrow_down.svg";

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
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("#카공");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    setSelected(option.label);
    setIsOpen(false);
    if (onSelect) onSelect(option); // option 전체를 전달
  };

  return (
    <div className="rate-dropdown-menu">
      <div className="rate-dropdown-header" onClick={toggleDropdown}>
        <span>{selected}</span>
        <img src={downarrow} alt="arrow" />
      </div>
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