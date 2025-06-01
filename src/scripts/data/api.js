import { getAccessToken } from '../utils/auth';
import { BASE_URL } from '../config';

const ENDPOINTS = {
  // Auth
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,
  USER_DETAILS: (id) => `${BASE_URL}/users/${id}`,
  USER_UPDATE: (id) => `${BASE_URL}/users/${id}`,
  
  // Events
  EVENTS: `${BASE_URL}/events`,
  EVENT_DETAILS: (id) => `${BASE_URL}/events/${id}`,

  // Destinations
  DESTINATIONS: `${BASE_URL}/destinations`,
  DESTINATION_DETAILS: (id) => `${BASE_URL}/destinations/${id}`,
  
  // Reviews
  REVIEWS: `${BASE_URL}/reviews`,
  REVIEWS_USER: (id) => `${BASE_URL}/reviews/user?userId=${id}`,
  // Reviews - Event
  NEW_REVIEW_EVENT: `${BASE_URL}/reviews/events`,
  UPDATE_REVIEW_EVENT: (id) => `${BASE_URL}/reviews/events/${id}`,
  REVIEWS_EVENT: (id) => `${BASE_URL}/reviews?type=event&targetId=${id}`,
  REVIEWS_EVENT_STAT: (id) => `${BASE_URL}/reviews/event/${id}/stats`,
  // Reviews - Destination
  NEW_REVIEW_DESTINATION: `${BASE_URL}/reviews/destinations`,
  UPDATE_REVIEW_DESTINATION: (id) => `${BASE_URL}/reviews/destinations/${id}`,
  REVIEWS_DESTINATION: (id) => `${BASE_URL}/reviews?type=destination&targetId=${id}`,
  REVIEWS_DESTINATION_STAT: (id) => `${BASE_URL}/reviews/destination/${id}/stats`,
};

// Auth
export async function register ({ name, email, password }) {
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

export async function login ({email, password}) {
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

export async function getUserById (id) {
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

export async function updateUser (id, {email, name}) {
  const token = getAccessToken();
  const data = JSON.stringify({email, name});
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

// Events
export async function getEvents () {
  const token = getAccessToken();
  
  const response = await fetch(ENDPOINTS.EVENTS, {
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

export async function getEventById (id) {
  const token = getAccessToken();
  const response = await fetch(ENDPOINTS.EVENT_DETAILS(id), {
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

// Destinations
export async function getDestinations () {
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

export async function getDestinationById (id) {
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
  const response = await fetch(`${BASE_URL}/reviews`);
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
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  const json = await response.json();
  return { ...json, ok: response.ok };
}