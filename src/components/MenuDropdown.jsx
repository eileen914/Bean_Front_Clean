import React, { useEffect, useRef } from "react";

/**
 * 재사용 가능한 드롭다운 메뉴
 * @param {boolean} open       - 열림 여부
 * @param {function} onClose   - 닫기 콜백
 * @param {function} onGoto    - 라우팅 콜백 (path => void)
 * @param {Array} items        - {label, path} 배열 (옵션)
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
  const ref = useRef(null);

  // 바깥 클릭/ESC로 닫기
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

  if (!open) return null;

  return (
    <div ref={ref} className="menu-dropdown" role="menu" aria-label="메뉴">
      {items.map((it) => (
        <button
          key={it.path}
          className="menu-item"
          role="menuitem"
          onClick={() => {
            onClose?.();
            onGoto?.(it.path);
          }}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
};

export default MenuDropdown;
