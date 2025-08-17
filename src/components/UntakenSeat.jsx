import "./UntakenSeat.css";
import line12 from "../assets/Line7.png";

 export default function UntakenSeat () {
  return (
    <div className="untaken-frame">
      <div className="untaken-frame-wrapper">
        <div className="untaken-div-wrapper">
          <div className="untaken-line-wrapper">
            <img className="untaken-line" alt="Line" src={line12} />
          </div>
        </div>
    </div>

    <div className="untaken-div">
      <div className="untaken-div-2">
        <p className="untaken-element">
          <span className="untaken-text-wrapper">6-1</span>

          <span className="untaken-span">번 좌석</span>
        </p>

      <div className="untaken-element-2">
        2인석&nbsp;|&nbsp;&nbsp;기본(사각)
        테이블&nbsp;|&nbsp;&nbsp;콘센트 자리
      </div>

        <div className="untaken-div-wrapper-2">
          <div className="untaken-text-wrapper-2">자리 예약하기</div>
        </div>
      </div>
    </div>
  </div>
  );
 };


