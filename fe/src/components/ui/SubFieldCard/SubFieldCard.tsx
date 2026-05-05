import React, { useMemo } from 'react';
import './SubFieldCard.css';

interface PricingRule {
  rule_name: string;
  day_of_week: string[];
  start_hour: string;
  end_hour: string;
  price_multiplier: number;
  priority: number;
}

interface SubFieldProps {
  data: {
    sub_field_id: string | number;
    field_name: string;
    field_type: string;
    status: string;
    base_price: number;
    pricing: PricingRule[];
  };
}

const SubFieldCard: React.FC<SubFieldProps> = ({ data }) => {
  const isMaintenance = data.status === 'Bảo trì';

  // Nhóm các quy tắc giá theo khung giờ
  const groupedPricing = useMemo(() => {
    const groups: Record<string, PricingRule[]> = {};
    data.pricing.forEach((slot) => {
      const timeKey = `${slot.start_hour} - ${slot.end_hour}`;
      if (!groups[timeKey]) groups[timeKey] = [];
      groups[timeKey].push(slot);
    });
    return groups;
  }, [data.pricing]);

  return (
    <div className={`sub-field-card ${isMaintenance ? 'maintenance' : ''}`}>
      <h3 className="field-name">{data.field_name} {isMaintenance && <span className="status-appear">ĐANG BẢO TRÌ</span>}</h3>

      <div className="table-container">
        <table className="price-table">
          <thead>
            <tr>
              <th>Khung giờ</th>
              <th>Áp dụng</th>
              <th>Giá thuê/giờ</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedPricing).map(([timeRange, slots]) => (
              <React.Fragment key={timeRange}>
                {slots.map((slot, sIdx) => {
                  const isWeekend = slot.day_of_week.includes('Saturday') || slot.day_of_week.includes('Sunday');

                  const finalPrice = data.base_price * slot.price_multiplier;

                  return (
                    <tr key={sIdx}>
                      {/* Chỉ render ô Khung giờ ở dòng đầu tiên của nhóm */}
                      {sIdx === 0 && (
                        <td className="time-range" rowSpan={slots.length}>
                          <strong>{timeRange}</strong>
                        </td>
                      )}

                      <td>
                        <span className={`day-badge ${isWeekend ? 'weekend' : 'weekday'}`}>
                          {isWeekend ? "Thứ 7 - CN" : "Thứ 2 - Thứ 6"}
                        </span>
                      </td>

                      <td className="price-fixed">{finalPrice.toLocaleString('vi-VN')} VND</td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubFieldCard;
