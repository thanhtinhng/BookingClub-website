import React, { useEffect, useState } from "react";
import { Review } from "../../components/common/Review/Review";
import { getReviewsWithStatsApi } from "../../utils/review.api";
import { mapReviewData } from "../../mappers/reviewMapper";

const ComplexDetail = () => {

    const [reviews, setReviews] = useState<any[]>([]);
    const [overallRating, setOverallRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    const [page, setPage] = useState(1);
    const limit = 2; // giới hạn 1 trang hiển thị {limit} review

    useEffect(() => {
        fetchData(1, true);
    }, []);

    const fetchData = async (pageNumber: number, isFirst = false) => {
        try {
            const res = await getReviewsWithStatsApi(
                "65f1a2b3c4d5e6f7a8b90124", // Vì chưa có complex detail nên tạm gắn hard complex id, sau này sẽ truyền giá trị sau
                pageNumber,
                limit
            );

            const mapped = mapReviewData(res);

            if (isFirst) {
                // lần đầu load
                setReviews(mapped.reviews);
            } else {
                // load more → nối thêm
                setReviews((prev) => [...prev, ...mapped.reviews]);
            }

            setOverallRating(mapped.overallRating);
            setTotalReviews(mapped.totalReviews);

            // setData(mapped);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchData(nextPage);
    };

    const hasMore = reviews.length < totalReviews;

    return (
        <Review
            overallRating={overallRating}
            totalReviews={totalReviews}
            reviews={reviews}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
        />
    );
};

export default ComplexDetail;