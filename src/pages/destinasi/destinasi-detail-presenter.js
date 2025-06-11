import { API_URL, deleteReview, updateReview } from '../../constants/urlApi.js';
import { getSession } from '../../components/utils/auth';

export class DestinasiDetailPresenter {
  async loadData(destinationId) {
    try {
      const session = getSession();
      const res = await fetch(
        `${API_URL}/destinations/${destinationId}?userId=${session.user.userId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );
      if (!res.ok) throw new Error('Gagal memuat destinasi');
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async loadUlasan(destinationId) {
    try {
      const session = getSession();
      const res = await fetch(`${API_URL}/reviews?type=destination&targetId=${destinationId}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      if (!res.ok) throw new Error('Gagal memuat ulasan');
      const json = await res.json();
      return json;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async submitReview({ destinationId, userId, comment, rating }) {
    const ulasanRes = await this.loadUlasan(destinationId);
    const existing = ulasanRes?.data?.find((r) => r.user_id === userId);

    if (existing) return await this.updateReview(existing.id, comment, rating);
    return await this.addReview({ destinationId, userId, comment, rating });
  }

  async addReview({ destinationId, userId, comment, rating }) {
    const session = getSession();
    const res = await fetch(`${API_URL}/reviews/destinations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({ destinationId, userId, comment, rating }),
    });
    return await res.json();
  }

  async updateReview(reviewId, comment, rating) {
    try {
      const res = await updateReview(reviewId, { comment, rating });
      return res.ok;
    } catch (err) {
      console.error('[updateReview] Error:', err);
      return false;
    }
  }

  async deleteReview(reviewId) {
    try {
      const res = await deleteReview(reviewId);
      return res.ok;
    } catch (err) {
      console.error('[deleteReview] Error:', err);
      return false;
    }
  }
}
