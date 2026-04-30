import { useEffect, useState } from "react";
import "./CourtInfo.css"
import CourtGallery from "../../components/ui/CourtGallery/CourtGallery";
import OpeningHours from "../../components/common/OpeningHours/OpeningHours";
import BookingCard from "../../components/common/BookingCard/BookingCard";
import Review from "../../components/common/Review/Review"

interface ReviewItem {
  review_id: number;
  userName: string;
  avatarUrl?: string;
  rating: number;
  comment: string;
  created_at: string;
}
interface CourtData {
  id: string;
  name: string;
  address: string;
  ownerName: string;
  priceRange: string;
  images: string[];

  openTime: string;
  closeTime: string;

  fieldName: string;
  fieldPrice: number;
  sportType: string;

  rating: number;
  totalReviews: number;
  reviews: ReviewItem[];
}

const CourtInfo = () => {
  // Lưu trữ dữ liệu và trạng thái loading
  const [court, setCourt] = useState<CourtData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // const [selectedCourtId, setSelectedCourtId] = useState<string | undefined>(undefined);

  // useEffect(() => {
  //   // Fetch dữ liệu
  //   const fetchCourtInfo = async () => {
  //     try {
  //       setLoading(true);
  //       // API
  //       const response = await fetch("https://api.your-domain.com/courts/123");

  //       if (!response.ok) {
  //         throw new Error("Không thể lấy dữ liệu sân!");
  //       }

  //       const data = await response.json();
  //       setCourt(data);
  //     } catch (err: any) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCourtInfo();
  // }, []); 

  const [selectedCourtId, setSelectedCourtId] = useState<string | undefined>("PB_001");

  useEffect(() => {
    const fetchCourtInfo = async () => {
      try {
        setLoading(true);

        // GIẢ LẬP GỌI API (Sẽ thay bằng fetch thật sau)
        await new Promise((resolve) => setTimeout(resolve, 800)); // Đợi 0.8s cho giống thật

        const mockResponse: CourtData = {
          id: "CPX_001",
          name: "Trung Tâm Thể Thao Rạch Miễu",
          fieldName: "Sân Pickleball Số 1", // Tên sân cụ thể để hiện trong BookingCard
          address: "Số 1 Hoa Phượng, Phường 2, Quận Phú Nhuận, TP.HCM",
          ownerName: "Ban Quản Lý Rạch Miễu",
          fieldPrice: 250000,
          priceRange: "150.000đ - 350.000đ",
          images: [
            "https://picsum.photos/id/101/800/600",
            "https://picsum.photos/id/102/400/300",
            "https://picsum.photos/id/103/400/300",
            "https://picsum.photos/id/104/400/300",
          ],
          sportType: "Pickleball",
          openTime: "06:00",
          closeTime: "22:00",
          rating: 4.8,
          totalReviews: 124,
          reviews: [
            {
              review_id: 1,
              userName: "Nguyễn Văn A",
              rating: 5,
              comment: "Sân cực kỳ chất lượng, thảm mới tinh!",
              created_at: "20/04/2024"
            },
            {
              review_id: 2,
              userName: "Nguyễn Văn B",
              rating: 5,
              comment: "Sân rất đẹp, thảm mới và êm. Ánh sáng vừa đủ không bị chói mắt.",
              created_at: "20/04/2024"
            },
            {
              review_id: 3,
              userName: "Trần Thị B",
              rating: 4,
              comment: "Chỗ để xe hơi chật tí vào giờ cao điểm, nhưng chất lượng sân thì tuyệt vời.",
              created_at: "18/04/2024"
            }
          ]
        };

        setCourt(mockResponse);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourtInfo();
  }, []);

  // Xử lý các trạng thái 
  if (loading) return <div className="loading">Đang tải thông tin sân...</div>;
  if (error) return <div className="error">Lỗi: {error}</div>;
  if (!court) return <div>Không tìm thấy thông tin sân.</div>;

  return (
    <main className="court-detail-container">
      <div className="court-left-section">
        <div className="court-gallery-wrapper">
          <CourtGallery
            images={court.images}
            courtName={court.name}
            ownerName={court.ownerName}
            priceRange={court.priceRange}
          />

          <div className="court-main-header">
            <div className="header-info">
              <h1 className="court-title-name">{court.name}</h1>
              <p className="court-location-address">{court.address}</p>
            </div>

            <div className="header-actions">
              c<button className="action-btn" title="Yêu thích">❤️</button>
              <button className="action-btn" title="Chia sẻ">🔗</button>
            </div>
          </div>

          <section className="court-description-section">
            <h3 className="section-title">Mô tả sân</h3>
            <div className="description-text">
              <p>
                Sân cầu lông/pickleball tại Trung tâm Rạch Miễu được trang bị mặt thảm tiêu chuẩn thi đấu,
                hệ thống chiếu sáng chống chói và không gian thoáng đãng. Đây là địa điểm lý tưởng
                cho các giải đấu phong trào và tập luyện nâng cao sức khỏe.
              </p>
              <p>
                Vị trí thuận tiện ngay trung tâm quận Phú Nhuận, bãi đậu xe rộng rãi và khu vực
                nghỉ ngơi sạch sẽ cho vận động viên.
              </p>
            </div>
          </section>

          <section className="court-amenities-section">
            <h3 className="section-title">Dịch vụ</h3>
            <div className="amenities-grid">
              <div className="amenity-item">🍴 Kitchen</div>
              <div className="amenity-item">📶 Free Wireless Internet</div>
              <div className="amenity-item">📺 Television with Netflix</div>
              <div className="amenity-item">❄️ Air Conditioner</div>
              <div className="amenity-item">🌅 Balcony or Patio</div>
              <div className="amenity-item">🧺 Washer</div>
            </div>
          </section>

          <section className="court-amenities-section">
            <h3 className="section-title">Tiện nghi</h3>
            <div className="amenities-grid">
              <div className="amenity-item">📋 Daily Cleaning</div>
              <div className="amenity-item">🛡️ Disinfections and Sterilizations</div>
              <div className="amenity-item">🧯 Fire Extinguishers</div>
              <div className="amenity-item">🔔 Smoke Detectors</div>
            </div>
          </section>

          <section className="court-reviews-wrapper">
            <Review
              overallRating={court.rating}
              totalReviews={court.totalReviews}
              reviews={court.reviews}
              onShowAllClick={() => console.log("Mở modal xem hết review")}
            />
          </section>
        </div>

        <aside className="court-sidebar">
          <OpeningHours
            openTime={court.openTime}
            closeTime={court.closeTime}
          />
          <BookingCard
            complexId={court.id}
            complexName={court.name}
            courtId={selectedCourtId}
            courtName={court.fieldName}
            sportType={court.sportType}
            basePricePerHour={court.fieldPrice}
            onClearSelection={() => setSelectedCourtId(undefined)}
          />
        </aside>
      </div>
    </main>
  );
};

export default CourtInfo;
