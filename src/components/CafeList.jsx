import PropTypes from "prop-types";
import React from "react";
import "./CafeList.css";
import ellipse from '../assets/Ellipse.svg';
import star_rating from '../assets/star_rating.svg';
import ion_location from '../assets/ion_location.svg';
import bookmark from '../assets/bookmark_sharp.svg';
import coffee from '../assets/coffee-bean.svg';
import mdi_clock from '../assets/mdi_clock.svg';
import './UserChatbot.css';


export const CafeList = ({
  text = "마인드멜드",
  /*ellipse = "ellipse-1.svg",
  vector = "vector-3.svg",
  img = "vector-4.svg",
  vector1 = "vector.svg",
  vector2 = "image.svg",
  vector3 = "vector-2.svg",*/
}) => {
  return (
    <div className="cafe-list">
      <div className="frame">
        <div className="div">
          <div className="text-wrapper">{text}</div>

          <div className="frame-2">
            <img className="ellipse" alt="Ellipse" src={ellipse} />

            <div className="frame-3">
              <div className="bxs-coffee-bean">
                <div className="overlap-group">
                  <img className="vector" alt="Vector" src={coffee} />

                  <img className="img" alt="Vector" src={coffee} />
                </div>
              </div>

              <p className="element">
                <span className="span">2 </span>

                <span className="text-wrapper-2">/ 10</span>
              </p>
            </div>
          </div>
        </div>

        <div className="material-symbols">
          <img className="vector-2" alt="bookmark" src={bookmark} />
        </div>
      </div>

      <div className="frame-4">
        <div className="frame-5">
          <div className="frame-5">
            <div className="frame-6">
              <div className="frame-7">
                <img className="vector-3" alt="Star" src={star_rating} />

                <p className="p">
                  <span className="text-wrapper-3">4.9 </span>

                  <span className="text-wrapper-4">(1,067)</span>
                </p>
              </div>

              <div className="div-wrapper">
                <p className="div-2">
                  <span className="text-wrapper-5">#</span>

                  <span className="text-wrapper-6">&nbsp;</span>

                  <span className="text-wrapper-5">카공</span>
                </p>
              </div>
            </div>

            <div className="frame-8">
              <div className="ion-location-sharp">
                <img className="vector-4" alt="location" src={ion_location} />
              </div>

              <div className="frame-8">
                <div className="text-wrapper-7">서울대입구역</div>
              </div>
            </div>
          </div>
        </div>

        <div className="frame-9">
          <img className="mdi-clock" alt="clock" src={mdi_clock} />
          <div className="frame-6">
            <div className="text-wrapper-8">영업종료</div>
          </div>

          <div className="text-wrapper-9">오늘(월) 12:00 ~ 18:00</div>
        </div>
      </div>

      <div className="frame-10">
        <div className="rectangle" />

        <div className="rectangle" />
      </div>
    </div>
  );
};

CafeList.propTypes = {
  text: PropTypes.string,
  ellipse: PropTypes.string,
  vector: PropTypes.string,
  img: PropTypes.string,
  vector1: PropTypes.string,
  vector2: PropTypes.string,
  vector3: PropTypes.string,
};

export default CafeList