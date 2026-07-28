// API Client for GeneScope Backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function sendMessage(message) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Server responded with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("GeneScope API Error:", err);
    throw err;
  }
}

export async function fetchHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await response.json();
  } catch (err) {
    return { status: "offline", error: err.message };
  }
}

export async function fetchTopics() {
  try {
    const response = await fetch(`${API_BASE_URL}/topics`);
    return await response.json();
  } catch (err) {
    return { topics: [] };
  }
}
