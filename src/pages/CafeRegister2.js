import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CafeRegister2.css';

const CafeRegister2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: '',
    detailAddress: '',
    businessHours: '',
    description: '',
    website: '',
    instagram: '',
    capacity: '',
    parking: false,
    wifi: false,
    powerOutlet: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically validate and save the data
    console.log('Registration step 2:', formData);
    navigate('/cafe-map-creating');
  };

  const handleBackClick = () => {
    navigate('/cafe-register-1');
  };

  return (
    <div className="cafe-register-2">
      <div className="register-container">
        <div className="register-header">
          <button className="back-btn" onClick={handleBackClick}>
            ← 뒤로가기
          </button>
          <h1 className="register-title">업체 등록</h1>
          <div className="progress-bar">
            <div className="progress-step completed">1</div>
            <div className="progress-line completed"></div>
            <div className="progress-step active">2</div>
          </div>
        </div>

        <div className="register-form-container">
          <div className="form-header">
            <h2>상세 정보 입력</h2>
            <p>업체의 상세 정보를 입력해주세요</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>📍 위치 정보</h3>
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="address">주소 *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="주소를 입력하세요"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="detailAddress">상세주소</label>
                  <input
                    type="text"
                    id="detailAddress"
                    name="detailAddress"
                    value={formData.detailAddress}
                    onChange={handleInputChange}
                    placeholder="상세주소를 입력하세요"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>🕒 운영 정보</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="businessHours">영업시간 *</label>
                  <input
                    type="text"
                    id="businessHours"
                    name="businessHours"
                    value={formData.businessHours}
                    onChange={handleInputChange}
                    placeholder="예: 09:00-18:00"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="capacity">수용 인원</label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="예: 30"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>📝 업체 소개</h3>
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="description">업체 소개</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="업체에 대한 소개를 작성해주세요"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>🌐 온라인 정보</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="website">웹사이트</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="instagram">인스타그램</label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="@username"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>✅ 편의시설</h3>
              <div className="facilities-grid">
                <label className="facility-item">
                  <input
                    type="checkbox"
                    name="parking"
                    checked={formData.parking}
                    onChange={handleInputChange}
                  />
                  <span className="facility-icon">🚗</span>
                  <span className="facility-text">주차 가능</span>
                </label>
                <label className="facility-item">
                  <input
                    type="checkbox"
                    name="wifi"
                    checked={formData.wifi}
                    onChange={handleInputChange}
                  />
                  <span className="facility-icon">📶</span>
                  <span className="facility-text">Wi-Fi</span>
                </label>
                <label className="facility-item">
                  <input
                    type="checkbox"
                    name="powerOutlet"
                    checked={formData.powerOutlet}
                    onChange={handleInputChange}
                  />
                  <span className="facility-icon">🔌</span>
                  <span className="facility-text">콘센트</span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="register-submit-btn">
                업체 등록 완료하기
              </button>
            </div>
          </form>

          <div className="register-info">
            <h3>📋 등록 완료 안내</h3>
            <ul>
              <li>입력한 정보는 업체 등록 후 수정할 수 있습니다</li>
              <li>등록 완료 후 업체 인증 절차를 진행합니다</li>
              <li>인증 완료 후 Bean 서비스를 이용할 수 있습니다</li>
              <li>추가 문의사항은 고객센터로 연락해주세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeRegister2; 