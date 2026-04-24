import CourtGallery from "../../components/ui/CourtGallery/CourtGallery";
import { Heart, Share2 } from "lucide-react";
import "./CourtDetailGalleryDemo.css";

const mockCourtImages: string[] = [
  "https://images.unsplash.com/photo-1547934045-2942d193cb49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFkbWludG9uJTIwY291cnR8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1673995611957-9c039a5d4d90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmFkbWludG9uJTIwY291cnR8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1708312604073-90639de903fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhZG1pbnRvbiUyMGNvdXJ0fGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1666914146602-680176b297ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJhZG1pbnRvbiUyMGNvdXJ0fGVufDB8fDB8fHww",
];

function CourtDetailGalleryDemo() {
  const courtName = "Sunrise Court Complex";
  const courtAddress = "12 Tran Phu, Thu Duc, Ho Chi Minh City";

  // Toggle this flag to validate layout with/without the right-side block.
  const hasOperatingHoursBlock = true;

  return (
    <main className="court-detail-page">
      <section className="court-detail-main">
        <CourtGallery
          images={mockCourtImages}
          courtName={courtName}
          ownerName="John Doberman"
          priceRange="$1000 - $5000"
        />

        <header className="court-detail-header">
          <div className="court-detail-title-block">
            <h1>{courtName}</h1>
            <p>{courtAddress}</p>
          </div>

          <div className="court-detail-actions" aria-label="Court actions">
            <button type="button" className="court-action-button" aria-label="Favorite court">
              <span className="court-action-button-inner court-action-button-inner-heart">
                <Heart size={22} strokeWidth={2.3} />
              </span>
            </button>
            <button type="button" className="court-action-button" aria-label="Share court">
              <span className="court-action-button-inner court-action-button-inner-share">
                <Share2 size={22} strokeWidth={2.3} />
              </span>
            </button>
          </div>
        </header>
      </section>

      {hasOperatingHoursBlock && (
        <aside className="court-detail-aside">
          <h2>Giờ mở cửa</h2>
          <p>Khối này placeholder cho thông tin giờ mở cửa</p>
        </aside>
      )}
    </main>
  );
}

export default CourtDetailGalleryDemo;
