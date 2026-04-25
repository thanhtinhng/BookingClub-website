export const mapReviewData = (apiData: any) => {
  return {
    overallRating: apiData.avgRating,
    totalReviews: apiData.totalReviews,
    reviews: apiData.reviews.map((item: any) => ({
      review_id: item._id,
      userName: item.user_id?.name || "Ẩn danh",
      avatarUrl: item.user_id?.avatar_url,
      rating: item.rating,
      comment: item.comment,
      created_at: new Date(item.createdAt).toLocaleString("vi-VN")
    }))
  };
};