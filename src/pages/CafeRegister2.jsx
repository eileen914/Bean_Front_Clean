import { useRef, useState, useEffect } from "react";
import "./CafeRegister2.css";
import { useNavigate } from "react-router-dom";
import { signUp, createCafe } from "../apis/api";

const CafeRegister2 = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
  });
  const [cafeData, setCafeData] = useState({
    name: "",
    address: "",
    description: "",
    photo_urls: [
      "/data/cafe_images/1.jpg",
      "/data/cafe_images/2.jpg",
      "/data/cafe_images/3.jpg",
    ],
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUpData = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCafeData = (e) => {
    const { name, value } = e.target;
    setCafeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextClick = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // 간단한 검증
    if (!signUpData.username.trim() || !signUpData.password.trim()) {
      setErrorMsg("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    if (!cafeData.name.trim() || !cafeData.address.trim()) {
      setErrorMsg("업체명과 주소는 필수입니다.");
      return;
    }

    // 1) 회원가입
    console.log("회원가입 데이터:", signUpData);
    const result = await signUp(signUpData); // 토큰/유저ID 반환 가정
    console.log("회원가입 결과:", result);

    if (result.status !== 201) {
      setErrorMsg("회원가입에 실패했습니다. 다시 시도해주세요.");
      return;
    } else {
      const result = await createCafe(cafeData);
      const cafeId = result.data.id;

      if (result.status !== 201) {
        alert("업체 등록에 실패했습니다. 다시 시도해주세요.");
        return;
      } else {
        // 3) 성공 시 이동
        alert("업체 등록이 완료되었습니다.");
        navigate("/cafe-signin", { state: { cafeId } });
      }
    }
  };

  useEffect(() => {
    console.log("Error message:", errorMsg);
  }, [errorMsg]);

  const handleLogoClick = () => {
    navigate("/cafe-landing");
  };

  return (
    <div className="cafe-register">
      <header className="cafe-fixed-header">
        <div className="cafe-header-content">
          <img src="/logo.png" alt="Bean Logo" className="cafe-header-logo" />
          <h1 className="cafe-header-text" onClick={handleLogoClick}>
            Bean
          </h1>
        </div>
      </header>

      <div className="register2-container">
        <h2 className="register2-title">업체 등록하기</h2>

        <section className="register2-step">
          <div className="register2-step-header-wrapper">
            <div className="register2-step-header">
              <div className="step-label-box">
                <span>필수 정보 입력하기</span>
              </div>
              <div className="step-header-text">
                업체명, 상세설명, 대표키워드 등 우리 가게 정보를 알려주세요.
                <br />
                이외 상세정보는 업체 등록 이후 수정하실 수 있습니다.
              </div>
            </div>
          </div>

          <form className="register2-form">
            <div className="register2-form-row">
              <label>업체명</label>
              <input
                required
                type="text"
                id="name"
                name="name"
                className="input"
                value={cafeData.name}
                onChange={handleCafeData}
                placeholder="최대 30자"
              />
            </div>
            <div className="register2-form-row">
              <label>아이디</label>
              <input
                required
                type="text"
                id="username"
                name="username"
                className="input"
                value={signUpData.username}
                onChange={handleSignUpData}
                placeholder="빈자리 서비스에 활용할 아이디를 입력해주세요"
              />
            </div>
            <div className="register2-form-row">
              <label>비밀번호</label>
              <input
                required
                type="password"
                id="password"
                name="password"
                className="input"
                value={signUpData.password}
                onChange={handleSignUpData}
                placeholder="빈자리 서비스에 활용할 비밀번호를 입력해주세요"
              />
            </div>
            <div className="register2-form-row">
              <label>전화번호</label>
              <input type="tel" placeholder="숫자만 입력해주세요" />
            </div>
            <div className="register2-form-row">
              <label>업체 주소</label>
              <input
                required
                type="text"
                id="address"
                name="address"
                className="input"
                value={cafeData.address}
                onChange={handleCafeData}
                placeholder="상세 주소까지 한 줄로 입력해주세요"
              />
            </div>
            <div className="register2-form-row">
              <label>카페 설명</label>
              <input
                id="description"
                name="description"
                className="input"
                placeholder="카페에 대한 한줄 설명을 적어주세요"
                rows={3}
                value={cafeData.description}
                onChange={handleCafeData}
              ></input>
            </div>
          </form>
        </section>

        <div className="register2-footer">
          <button className="register-button" onClick={handleNextClick}>
            업체 등록 완료하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CafeRegister2;
