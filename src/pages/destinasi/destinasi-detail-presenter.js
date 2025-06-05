import { API_URL } from '../../constants/urlApi.js';
import { getSession } from "../../components/utils/auth";

export class DestinasiDetailPresenter {
  async loadData(destinationId) {
    try {
      const session = getSession();
      const res = await fetch(`${API_URL}/destinations/${destinationId}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      if (!res.ok) throw new Error('Gagal memuat destinasi');
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getUserReview(destinationId, userId) {
    const session = getSession();
    const res = await fetch(`${API_URL}/destinations/${destinationId}/reviews?userId=${userId}`, {
      headers: {
       Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const json = await res.json();
    return json.data?.[0] || null;
  }

  async submitReview({ destinationId, userId, comment, rating }) {
    const existing = await this.getUserReview(destinationId, userId);
    if (existing) {
      return await this.updateReview(existing.id, { comment, rating });
    } else {
      return await this.addReview({ destinationId, userId, comment, rating });
    }
  }

  async addReview({ destinationId, userId, comment, rating }) {
    const session = getSession();
    const res = await fetch(`${API_URL}/destinations/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({ destination_id: destinationId, user_id: userId, comment, rating }),
    });
    return await res.json();
  }

  async updateReview(reviewId, { comment, rating }) {
    const session = getSession();
    const res = await fetch(`${API_URL}/destinations/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({ comment, rating }),
    });
    return await res.json();
  }
}
