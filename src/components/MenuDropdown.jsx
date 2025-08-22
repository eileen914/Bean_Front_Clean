
import React, { useEffect, useRef } from "react";

/**
 * MenuDropdown 컴포넌트
 * - props:
 *   open: 드롭다운 열림 여부 (boolean)
 *   onClose: 드롭다운 닫기 콜백 (함수)
 *   onGoto: 메뉴 클릭 시 라우팅 콜백 (path => void)
 *   items: 메뉴 항목 배열 [{label, path}]
 * - 역할: 메뉴 버튼 클릭 시 드롭다운을 띄우고, 바깥 클릭/ESC로 닫기, 각 메뉴 클릭 시 라우팅
 */
const MenuDropdown = ({
  open,
  onClose,
  onGoto,
  items = [
    { label: "카페 상세정보", path: "/cafe-detail" },
    { label: "테이블 정보 수정하기", path: "/cafe-tables" },
    { label: "빈자리 관리하기", path: "/cafe-update" },
  ],
}) => {
  const ref = useRef(null); // 드롭다운 DOM 참조

  // 드롭다운이 열렸을 때 바깥 클릭 또는 ESC 키로 닫기 처리
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose?.();
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  // 닫힌 상태면 렌더링하지 않음
  if (!open) return null;

  // 드롭다운 메뉴 UI 렌더링
  return (
    <div ref={ref} className="menu-dropdown" role="menu" aria-label="메뉴">
      {items.map((it) => (
        <button
          key={it.path}
          className="menu-item"
          role="menuitem"
          onClick={() => {
            onClose?.(); // 메뉴 클릭 시 드롭다운 닫기
            onGoto?.(it.path); // 메뉴 클릭 시 라우팅
          }}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
};

export default MenuDropdown;
