import axios from "./axios.customize";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar_url?: string;
}

interface Review {
  _id: string;
  user_id: User;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewResponse {
  avgRating: number;
  totalReviews: number;
  ratingBreakdown: Record<string, number>;
  reviews: Review[];
}

export const getReviewsWithStatsApi = (
  complex_id: string,
  page: number = 1,
  limit: number = 5
): Promise<ReviewResponse> => {
  const URL_API = `/api/reviews/with-stats?complex_id=${complex_id}&page=${page}&limit=${limit}`;
  return axios.get(URL_API);
};



interface CreateReviewPayload {
  booking_id: string;
  rating: number;
  comment: string;
}

export const createReviewApi = (
  data: CreateReviewPayload
) => {
  const URL_API = "/api/reviews";
  return axios.post(URL_API, data);
};
