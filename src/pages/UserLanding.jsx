import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserLanding.css";
import group1 from "../assets/user-landing.png";

export const UserLanding = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/user-home");
  };

  return (
    <div className="landing-page-before">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <img className="group" alt="Group" src={group1} />

          <div className="frame">
            <div className="div-wrapper" onClick={handleLogin}>
              <div className="text-wrapper">로그인</div>
            </div>

            <div className="div" onClick={handleLogin}>
              <div className="text-wrapper-2">회원가입</div>
            </div>
          </div>

          <div className="frame-2">
            <div className="rectangle-wrapper">
              <div className="rectangle" />
            </div>
            <img src="/logo.png" alt="로고" className="img" />

          </div>

          <div className="frame-3">
            <div className="frame-4">
              <p className="p">Spot your day, here in</p>
            </div>

            <div className="frame-5">
              <div className="text-wrapper-3">Bean</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLanding;
