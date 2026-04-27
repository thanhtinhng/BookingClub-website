import React from 'react';
import './OpeningHours.css';

interface OpeningHoursProps {
  openTime: string;  
  closeTime: string; 
}

const OpeningHours: React.FC<OpeningHoursProps> = ({ openTime, closeTime }) => {
  // Danh sách các thứ trong tuần để hiển thị
  const daysOfWeek = [
    { label: 'Thứ 2', value: 1 },
    { label: 'Thứ 3', value: 2 },
    { label: 'Thứ 4', value: 3 },
    { label: 'Thứ 5', value: 4 },
    { label: 'Thứ 6', value: 5 },
    { label: 'Thứ 7', value: 6 },
    { label: 'Chủ Nhật', value: 0 }, // Chủ nhật trong JS là 0
  ];
  const todayValue = new Date().getDay();

  return (
    <div className="opening-hours-card">
      <h3 className="opening-hours-title">Thời gian hoạt động</h3>
      
      <div className="opening-hours-list">
        {daysOfWeek.map((item) => {
          // Kiểm tra xem dòng này có phải là ngày hôm nay không
          const isToday = item.value === todayValue;

          return (
            <div 
              key={item.label} 
              className={`opening-day-item ${isToday ? 'active-today' : ''}`}
            >
              <span className="day-name">
                {item.label} {isToday && <span className="today-dot">•</span>}
              </span>
              <span className="day-time">{openTime} - {closeTime}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OpeningHours;
