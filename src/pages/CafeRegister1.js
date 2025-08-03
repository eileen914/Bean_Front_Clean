import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CafeRegister1.css';

const CafeRegister1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    businessNumber: '',
    representativeName: '',
    phone: '',
    email: ''
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
    // Here you would typically validate and save the data
    console.log('Registration step 1:', formData);
    navigate('/cafe-register-2');
  };

  const handleBackClick = () => {
    navigate('/cafe-landing');
  };

  return (
    <div className="cafe-register-1">
      <div className="register-container">
        <div className="register-header">
          <button className="back-btn" onClick={handleBackClick}>
            ← 뒤로가기
          </button>
          <h1 className="register-title">업체 등록</h1>
          <div className="progress-bar">
            <div className="progress-step active">1</div>
            <div className="progress-line"></div>
            <div className="progress-step">2</div>
          </div>
        </div>

        <div className="register-form-container">
          <div className="form-header">
            <h2>기본 정보 입력</h2>
            <p>업체의 기본 정보를 입력해주세요</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="businessName">업체명 *</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="업체명을 입력하세요"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="businessType">업종 *</label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">업종을 선택하세요</option>
                  <option value="cafe">카페</option>
                  <option value="restaurant">음식점</option>
                  <option value="bakery">베이커리</option>
                  <option value="bar">바</option>
                  <option value="other">기타</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="businessNumber">사업자등록번호 *</label>
                <input
                  type="text"
                  id="businessNumber"
                  name="businessNumber"
                  value={formData.businessNumber}
                  onChange={handleInputChange}
                  placeholder="000-00-00000"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="representativeName">대표자명 *</label>
                <input
                  type="text"
                  id="representativeName"
                  name="representativeName"
                  value={formData.representativeName}
                  onChange={handleInputChange}
                  placeholder="대표자명을 입력하세요"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">연락처 *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="010-0000-0000"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">이메일 *</label>
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
            </div>

            <div className="form-actions">
              <button type="submit" className="register-submit-btn">
                업체 등록하기
              </button>
            </div>
          </form>

          <div className="register-info">
            <h3>📋 등록 안내</h3>
            <ul>
              <li>모든 필수 항목(*)을 입력해주세요</li>
              <li>사업자등록번호는 정확히 입력해주세요</li>
              <li>입력한 정보는 업체 인증에 사용됩니다</li>
              <li>다음 단계에서 상세 정보를 입력할 수 있습니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeRegister1; 