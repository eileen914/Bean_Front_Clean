import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CafeSignIn.css';

const CafeSignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log('Login attempt:', formData);
    // For demo purposes, just show success message
    alert('로그인이 완료되었습니다!');
  };

  const handleBackClick = () => {
    navigate('/cafe-landing');
  };

  return (
    <div className="cafe-signin">
      <div className="signin-container">
        <div className="signin-header">
          <button className="back-btn" onClick={handleBackClick}>
            ← 뒤로가기
          </button>
          <h1 className="signin-title">로그인</h1>
        </div>

        <div className="signin-form-container">
          <div className="form-header">
            <h2>Bean에 오신 것을 환영합니다</h2>
            <p>카페 운영을 위한 모든 기능을 이용해보세요</p>
          </div>

          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="이메일을 입력하세요"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                로그인 상태 유지
              </label>
              <button type="button" className="forgot-password">
                비밀번호 찾기
              </button>
            </div>

            <button type="submit" className="signin-submit-btn">
              로그인
            </button>
          </form>

          <div className="signin-divider">
            <span>또는</span>
          </div>

          <div className="social-login">
            <button className="social-btn google-btn">
              <span className="social-icon">🔍</span>
              Google로 로그인
            </button>
            <button className="social-btn kakao-btn">
              <span className="social-icon">💬</span>
              카카오로 로그인
            </button>
          </div>

          <div className="signup-link">
            <p>아직 계정이 없으신가요?</p>
            <button 
              className="signup-btn"
              onClick={() => navigate('/cafe-register-1')}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeSignIn; 