import React from 'react';

const ChairDetection = ({
  width = 50,
  height = 50,
  x_position = 0,
  y_position = 0,
  socket = false,
  window = false,
  occupied = false,
  floorplan_id = 0,
  chair_idx = 0,
}) => {
  // 중심 좌표(x_position, y_position) 기준으로 위치 계산
  const left = x_position - width / 2;
  const top = y_position - height / 2;
  let chairStyle = {
    position: 'absolute',
    left: left,
    top: top,
    width: width,
    height: height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    color: '#ffffff',
    border: '2px solid #685d4a',
  };
  if (occupied) {
    chairStyle.color = '#feefb2';
    chairStyle.border = '2px solid #685d4a';
  } else if (selected) {
    chairStyle.color = '#fee266';
    chairStyle.border = '2px solid #827a6a';
    chairStyle.filter = 'drop-shadow(0px 4px rgba(130, 122, 106, 0.3))';
  }
    if (socket) {
      chairStyle.border = '2px solid #2196F3';
    }
  
    // Removed icon variable as per the requirement
  

  return (
    <div
      style={chairStyle}
    >
      {socket && (
        <span style={{ position: 'absolute', bottom: -15, right: 0, fontSize: 12 }}>🔌</span>
      )}
    </div>
  );
};

export default ChairDetection;