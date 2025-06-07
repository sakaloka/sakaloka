export const API_URL = 'https://sakaloka-backend-production.up.railway.app'; // ganti nanti
import { getAccessToken, getSession } from '../components/utils/auth';

const ENDPOINTS = {
  // Auth
  REGISTER: `${API_URL}/register`,
  LOGIN: `${API_URL}/login`,
  USER_DETAILS: (id) => `${API_URL}/users/${id}`,
  USER_UPDATE: (id) => `${API_URL}/users/${id}`,
  USER_SUMMARY: (id) => `${API_URL}/users/summary/${id}`,

  // Events
  EVENTS: (id) => `${API_URL}/events?userId=${id}`,
  EVENT_DETAILS: (id) => `${API_URL}/events/${id}`,

  // Destinations
  DESTINATIONS: `${API_URL}/destinations`,
  DESTINATION_DETAILS: (id) => `${API_URL}/destinations/${id}`,

  // Reviews
  REVIEWS: `${API_URL}/reviews`,
  REVIEWS_USER: (id) => `${API_URL}/reviews/user?userId=${id}`,
  // Reviews - Event
  NEW_REVIEW_EVENT: `${API_URL}/reviews/events`,
  UPDATE_REVIEW_EVENT: (id) => `${API_URL}/reviews/events/${id}`,
  REVIEWS_EVENT: (id) => `${API_URL}/reviews?type=event&targetId=${id}`,
  REVIEWS_EVENT_STAT: (id) => `${API_URL}/reviews/event/${id}/stats`,
  // Reviews - Destination
  NEW_REVIEW_DESTINATION: `${API_URL}/reviews/destinations`,
  UPDATE_REVIEW_DESTINATION: (id) => `${API_URL}/reviews/destinations/${id}`,
  REVIEWS_DESTINATION: (id) => `${API_URL}/reviews?type=destination&targetId=${id}`,
  REVIEWS_DESTINATION_STAT: (id) => `${API_URL}/reviews/destination/${id}/stats`,

  DESTINATIONS_TOPS: `${API_URL}/destinations/top`,
  DESTINATIONS_RECOMMENDED: (id) => `${API_URL}/destinations/recommend/${id}`,
  DESTINATION_CATEGORIES: `${API_URL}/destinations/categories`,

  // Bookmark
  BOOKMARK: `${API_URL}/bookmarks`,
  BOOKMARK_USER: (id) => `${API_URL}/bookmarks/${id}`,
  BOOKMARK_DELETE: `${API_URL}/bookmarks`,
};

// Auth
export async function register({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function login({ email, password }) {
  const data = JSON.stringify({ email, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getUserById(id) {
  const token = getAccessToken();
  const response = await fetch(ENDPOINTS.USER_DETAILS(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();

  return {
    ...json,
    ok: response.ok,
  };
}

export async function updateUser(id, { email, name }) {
  const token = getAccessToken();
  const data = JSON.stringify({ email, name });
  const response = await fetch(ENDPOINTS.USER_UPDATE(id), {
    headers: {
      method: 'PUT',
      Authorization: `Bearer ${token}`,
      body: data,
    },
  });
  const json = await response.json();

  return {
    ...json,
    ok: response.ok,
  };
}

export async function getUserSummary() {
  const session = getSession();

  const response = await fetch(ENDPOINTS.USER_SUMMARY(session.user.userId), {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const json = await response.json();

  return {
    ...json,
    ok: response.ok,
  };
}

// Events
export async function getEvents() {
  const session = getSession();

  const response = await fetch(ENDPOINTS.EVENTS(session.user.userId), {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const json = await response.json();

  return {
    ...json,
    ok: response.ok,
  };
}

export async function getEventById(id) {
  const session = getSession();
  const response = await fetch(ENDPOINTS.EVENT_DETAILS(id), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify ({
      userId: session?.user?.userId,
    }),
  });
  const json = await response.json();

  return {
    ...json,
    ok: response.ok,
  };
}

// Destinations
export async function getDestinations() {
  const token = getAccessToken();

  const response = await fetch(ENDPOINTS.DESTINATIONS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();

  return {
    ...json,
    ok: response.ok,
  };
}

export async function getDestinationById(id) {
  const token = getAccessToken();
  const response = await fetch(ENDPOINTS.DESTINATION_DETAILS(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();

  return {
    ...json,
    ok: response.ok,
  };
}

// Reviews
export async function getReviews() {
  const response = await fetch(`${API_URL}/reviews`);
  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function getReviewsByUser(userId) {
  const token = getAccessToken();
  const response = await fetch(ENDPOINTS.REVIEWS_USER(userId), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function getReviewsByEvent(eventId) {
  const response = await fetch(ENDPOINTS.REVIEWS_EVENT(eventId));
  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function getReviewsByDestination(destinationId) {
  const response = await fetch(ENDPOINTS.REVIEWS_DESTINATION(destinationId));
  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function addEventReview({ eventId, userId, comment, rating }) {
  const token = getAccessToken();
  const data = JSON.stringify({ event_id: eventId, user_id: userId, comment, rating });
  const response = await fetch(ENDPOINTS.NEW_REVIEW_EVENT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: data,
  });
  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function updateEventReview(reviewId, { comment, rating }) {
  const token = getAccessToken();
  const data = JSON.stringify({ comment, rating });
  const response = await fetch(ENDPOINTS.UPDATE_REVIEW_EVENT(reviewId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: data,
  });
  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function addDestinationReview({ destinationId, userId, comment, rating }) {
  const token = getAccessToken();
  const data = JSON.stringify({ destination_id: destinationId, user_id: userId, comment, rating });
  const response = await fetch(ENDPOINTS.NEW_REVIEW_DESTINATION, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: data,
  });
  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function updateDestinationReview(reviewId, { comment, rating }) {
  const token = getAccessToken();
  const data = JSON.stringify({ comment, rating });
  const response = await fetch(ENDPOINTS.UPDATE_REVIEW_DESTINATION(reviewId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: data,
  });
  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function destinationTop() {
  const response = await fetch(ENDPOINTS.DESTINATIONS_TOPS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function destinationCategories() {
  const response = await fetch(ENDPOINTS.DESTINATION_CATEGORIES, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function getRecommendedDestinations(userId) {
  const token = getSession().accessToken;
  const response = await fetch(ENDPOINTS.DESTINATIONS_RECOMMENDED(userId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const json = await response.json();
  return { ...json, ok: response.ok };
}

// Bookmark
export async function getUserBookmarks() {
  const session = getSession();
  const res = await fetch(ENDPOINTS.BOOKMARK_USER(session.user.userId), {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const json = await res.json();
  return { ...json, ok: res.ok }; 
}

export async function addDestinationBookmark(targetId) {
  const session = getSession();
  const response = await fetch(ENDPOINTS.BOOKMARK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({
      user_id: session.user.userId,
      type: 'Destinasi',
      destination_id: targetId,
    }),
  });
  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function addEventBookmark(targetId) {
  const session = getSession();
  const response = await fetch(ENDPOINTS.BOOKMARK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({
      user_id: session.user.userId,
      type: 'Acara Budaya',
      event_id: targetId,
    }),
  });
  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function removeBookmark(targetId) {
  const session = getSession();
  const response = await fetch(ENDPOINTS.BOOKMARK_DELETE, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({
      user_id: session.user.userId,
      bookmark_id: targetId,
    }),
  });
  
  const json = await response.json();
  return { ...json, ok: response.ok };
}