import React, { useState, useMemo } from 'react';
import SubFieldCard from '../../components/ui/SubFieldCard/SubFieldCard';
import './SubFieldList.css';

interface SubFieldListProps {
    dataSource: any[];
}

const SubFieldList: React.FC<SubFieldListProps> = ({dataSource}) => {
  const [filterType, setFilterType] = useState<string>('Tất cả');

  // Lấy danh sách các loại sân để filter
  const fieldTypes = useMemo(() => {
  const types = dataSource.map(item => item.config_id?.field_type);
  return ['Tất cả', ...Array.from(new Set(types))];
  }, [dataSource]);

  // Logic lọc dữ liệu
  const filteredData = useMemo(() => {
    if (filterType === 'Tất cả') return dataSource;
    return dataSource.filter(item => item.config_id?.field_type === filterType);
  }, [filterType, dataSource]);

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h2 className="main-title">Những sân còn trống</h2>
        
        <div className="filter-section">
          <label>Loại sân: </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select">
            {fieldTypes.map((type, index) => (
              <option key={`type-${type}-${index}`} value={type}>
                {type || 'Chưa xác định'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="list-wrapper">
        {filteredData.map((item, index) => (
          <SubFieldCard 
            key={item._id?.toString() || item.id || `subfield-${index}`} 
            data={item} 
          />
        ))}
      </div>
    </div>
  );
};

export default SubFieldList;
