import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from 'react-router-dom';
import ellipse from '../assets/Ellipse.svg';
import star_rating from '../assets/star_rating.svg';
import ion_location from '../assets/ion_location.svg';
import bookmark from '../assets/bookmark_sharp.svg';
import coffee from '../assets/coffee-bean.svg';
import mdi_clock from '../assets/mdi_clock.svg';
import "./CafeList.css";

export const CafeList = ({
  cafeId = 1,
  ownerId = 1,
  cafeName = "마인드멜드",
  cafeAddress = "서울대입구역",
  cafeImages = [],
}) => {
  const navigate = useNavigate();

  const handleEachCafe = () => {
    navigate("/user-cafe-detail", {
      state: {
        cafeId,
        ownerId,
        cafeName,
        cafeAddress,
        cafeImages,
      },
    });
  };
  return (
    <div className="cafe-list" onClick={handleEachCafe}>
      <div className="cafe-list-frame">
        <div className="cafe-list-div">
          <div className="cafe-list-text-wrapper">{cafeName}</div>

          <div className="list-frame-2">
            <img className="ellipse" alt="Ellipse" src={ellipse} />
            <div className="list-frame-3">
              <div className="bxs-coffee-bean">
                <div className="overlap-group">
                  <img className="list-vector" alt="Vector" src={coffee} />
                </div>
              </div>
              <p className="list-element">
                <span className="list-span">2 </span>
                <span className="list-text-wrapper-2">/ 10</span>
              </p>
            </div>
          </div>
        </div>
        <div className="material-symbols">
          <img className="list-vector-2" alt="bookmark" src={bookmark} />
        </div>
      </div>
      <div className="list-frame-4">
        {/* 평점/태그 영역 */}
        <div className="list-rating-tag">
          <div className="list-frame-6">
            <div className="list-frame-7">
              <img className="list-vector-3" alt="Star" src={star_rating} />
              <p className="list-p">
                <span className="list-text-wrapper-3">4.9 </span>
                <span className="list-text-wrapper-4">(1,067)</span>
              </p>
            </div>
            <div className="list-div-wrapper">
              <p className="list-div-2">
                <span className="list-text-wrapper-5">#</span>
                <span className="list-text-wrapper-6">&nbsp;</span>
                <span className="list-text-wrapper-5">카공</span>
              </p>
            </div>
          </div>
        </div>
        {/* 주소 영역 */}
        <div className="list-address">
          <div className="ion-location-sharp">
            <img className="list-vector-4" alt="location" src={ion_location} />
          </div>
          <div className="list-text-wrapper-7">{cafeAddress}</div>
        </div>
        {/* 영업시간 영역 */}
        <div className="list-business-time">
          <img className="mdi-clock" alt="clock" src={mdi_clock} />
          <div className="frame-6">
            <div className="list-text-wrapper-8">영업종료</div>
          </div>
          <div className="list-text-wrapper-9">오늘(월) 12:00 ~ 18:00</div>
        </div>
      </div>
      <div className="list-frame-10">
        {cafeImages && cafeImages[0] ? (
          <img
            className="list-rectangle"
            src={cafeImages[0]}
            alt="카페 이미지1"
          />
        ) : (
          <div className="list-rectangle" />
        )}
        {cafeImages && cafeImages[1] ? (
          <img
            className="list-rectangle"
            src={cafeImages[1]}
            alt="카페 이미지2"
          />
        ) : (
          <div className="list-rectangle" />
        )}
      </div>
    </div>
  );
};

CafeList.propTypes = {
  cafeId: PropTypes.number.isRequired,
  ownerId: PropTypes.number,
  cafeName: PropTypes.string.isRequired,
  cafeAddress: PropTypes.string.isRequired,
};

export default CafeList;
