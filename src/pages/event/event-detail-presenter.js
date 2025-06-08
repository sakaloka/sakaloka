import { API_URL, deleteReview, updateReview } from '../../constants/urlApi.js';
import { getSession } from '../../components/utils/auth.js';

export class EventDetailPresenter {
  async getReviews(eventId) {
    try {
      const session = getSession();
      const res = await fetch(`${API_URL}/reviews?type=event&targetId=${eventId}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      if (!res.ok) throw new Error('Gagal memuat ulasan');
      const json = await res.json();
      return json?.data || [];
    } catch (err) {
      console.error('[getReviews] Error:', err);
      return [];
    }
  }
  
  async updateReview (reviewId, comment, rating) {
    try {
      const res = await updateReview(reviewId, {comment, rating});
      return res.ok;
    } catch (err) {
      console.error('[updateReview] Error:', err);
      return false;
    }
  }

  async deleteReview (reviewId) {
    try {
      const res = await deleteReview(reviewId);
      return res.ok;
    } catch (err) {
      console.error('[deleteReview] Error:', err);
      return false;
    }
  }

  async submitReview({ comment, rating, userId, eventId }) {
    try {
      const session = getSession();
      const res = await fetch(`${API_URL}/reviews/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ comment, rating, userId, eventId }),
      });
      const json = await res.json();
      return json;
    } catch (err) {
      console.error('[submitReview] Error:', err);
      return { status: 'error', message: 'Gagal mengirim ulasan' };
    }
  }
}
