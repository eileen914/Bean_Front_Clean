
 import line12 from "../assets/Line7.png";
 import "./TakenSeat.css";

 export default function TakenSeat () {
  return (
    <div className="taken-frame">
      <div className="taken-frame-wrapper">
        <div className="taken-div-wrapper">
          <div className="taken-line-wrapper">
            <img className="taken-line" alt="Line" src={line12} />
          </div>
        </div>
    </div>

    <div className="taken-div">
      <p className="taken-element">
        <span className="taken-text-wrapper">6-1</span>

        <span className="taken-span">번 좌석</span>
      </p>

      <div className="taken-element-2">
        2인석&nbsp;|&nbsp;&nbsp;기본(사각)
        테이블&nbsp;|&nbsp;&nbsp;콘센트 자리
      </div>

      <div className="taken-div-wrapper-2">
        <div className="taken-text-wrapper-2">0시간 38분동안 사용중</div>
      </div>

      <p className="taken-p">
        <span className="taken-text-wrapper-3">
          입장시간|&nbsp;&nbsp;15:03
          <br />
          예상 퇴장시간|&nbsp;&nbsp;17:33
        </span>
        <span className="taken-text-wrapper-4">&nbsp;</span> 
        <span className="taken-text-wrapper-4">(남은 시간 1시간 15분)</span>      
      </p>

      <div className="taken-div-wrapper-3">
        <div className="taken-text-wrapper-6">자리 예약하기</div>
      </div>
    </div>
  </div>
  );
 };
