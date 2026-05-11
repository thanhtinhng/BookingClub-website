import { useEffect, useState } from 'react'
import SubFieldList from "../../features/SubFieldList/SubFieldList"
import BookingCard from "../../components/common/BookingCard/BookingCard"
import "./Booking.css"
import { useParams } from "react-router-dom";


// LƯU Ý: người làm sau cần lấy complex id từ url: http://localhost:5173/complexes/:complexId/booking


// Giả lập dữ liệu từ DB 
const MOCK_DB =
{
  // complexId: "CMP_001",
  complexName: "Sân bóng chất lượng cao",
  openTime: "05:00",
  closeTime: "22:00",
  subFields: [
    {
      sub_field_id: "65f1b1b1b1b1b1b1b1b1b106", //cần lấy sub field id thật từ be
      field_name: 'Sân 1',
      field_type: 'Bóng đá',
      status: 'Sẵn sàng',
      min_duration: 60,
      slot_step: 30,
      base_price: 250000,
      pricing: [
        {
          rule_name: 'Sáng ngày thường',
          day_of_week: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          start_hour: '00:00',
          end_hour: '17:00',
          price_multiplier: 1.5,
          priority: 4
        },
        {
          rule_name: 'Tối ngày thường',
          day_of_week: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          start_hour: '17:00',
          end_hour: '22:00',
          price_multiplier: 2.0,
          priority: 2
        },
        {
          rule_name: 'Cuối tuần sôi động',
          day_of_week: ["Saturday", "Sunday"],
          start_hour: '00:00',
          end_hour: '22:00',
          price_multiplier: 2.5,
          priority: 3
        }
      ]
    },
    {
      sub_field_id: "65f1b1b1b1b1b1b1b1b1b105",
      field_name: 'Sân 2',
      field_type: 'Bóng rổ',
      status: 'Sẵn sàng',
      min_duration: 90,
      slot_step: 60,
      base_price: 300000,
      pricing: [
        {
          rule_name: 'Sáng ngày thường',
          day_of_week: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          start_hour: '00:00',
          end_hour: '17:00',
          price_multiplier: 1.5,
          priority: 1
        },
        {
          rule_name: 'Tối ngày thường',
          day_of_week: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          start_hour: '17:00',
          end_hour: '22:00',
          price_multiplier: 2.0,
          priority: 2
        },
        {
          rule_name: 'Sáng cuối tuần',
          day_of_week: ["Saturday", "Sunday"],
          start_hour: '00:00',
          end_hour: '17:00',
          price_multiplier: 2.0,
          priority: 2
        },
        {
          rule_name: 'Cuối tuần sôi động',
          day_of_week: ["Saturday", "Sunday"],
          start_hour: '17:00',
          end_hour: '22:00',
          price_multiplier: 2.5,
          priority: 3
        }
      ]
    }
  ]
}

const Booking: React.FC = () => {
  // --- STATE QUẢN LÝ SÂN ĐƯỢC CHỌN ---
  // const [subFields, setSubFields] = useState<any[]>([]);
  // const [selectedCourt, setSelectedCourt] = useState<any | null>(null);
  const { complexId } = useParams();

  if (!complexId) {
    return <p>Complex not found</p>;
  }

  const [data, setData] = useState<any>(null);

  // GIẢ LẬP GỌI API
  useEffect(() => {
    setData(MOCK_DB);
  }, []);

  if (!data) return <div>Loading...</div>;

  const courtsList = data.subFields.map((item: any) => ({
    id: item.sub_field_id,
    name: item.field_name,
    sportType: item.field_type,
    minDuration: item.min_duration,
    slotStep: item.slot_step,
    basePrice: item.base_price,
    pricingRules: item.pricing
  }));

  return (
    <>
      <div className="app-booking-layout">
        {/* BÊN TRÁI: DANH SÁCH SÂN */}
        <div className="app-left-panel">
          <SubFieldList
            dataSource={data.subFields} />
        </div>

        {/* BÊN PHẢI: CHI TIẾT & GIỎ HÀNG */}
        <div className="app-right-panel">
          <BookingCard
            complexId={complexId}
            complexName={data.complexName}
            courtsList={courtsList}
            onClearSelection={() => { }}
          />
        </div>
      </div>
    </>
  );
};

export default Booking;
