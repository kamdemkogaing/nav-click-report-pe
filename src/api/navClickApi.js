const API_BASE = "https://test-tools.mrc-europe.com/v1/api/nav-click";

function buildQuery(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });

  return searchParams.toString();
}

async function fetchJson(url) {
  console.log("API Request:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  console.log("API Response:", data);

  return data;
}

function normalizeSummary(response) {
  const data = response?.data || response || {};

  return {
    data: {
      total_clicks: data.total_clicks || 0,
      top_nav_text: data.top_nav_text || "",
      top_nav_clicks: data.top_nav_clicks || 0,
      items: Array.isArray(data.items) ? data.items : [],
    },
  };
}

function normalizeDetails(response) {
  if (Array.isArray(response)) {
    return {
      meta: {
        page: 1,
        limit: response.length,
        total: response.length,
        total_pages: 1,
      },
      items: response,
    };
  }

  return {
    meta: response?.meta || {
      page: 1,
      limit: Array.isArray(response?.items) ? response.items.length : 0,
      total: Array.isArray(response?.items) ? response.items.length : 0,
      total_pages: 1,
    },
    items: Array.isArray(response?.items) ? response.items : [],
  };
}

function normalizeReport(response) {
  const data = response?.data || response || {};

  return {
    data: {
      total_clicks: data.total_clicks || 0,
      items: Array.isArray(data.items) ? data.items : [],
    },
  };
}

export async function getSummary(params = {}) {
  const query = buildQuery(params);
  const response = await fetchJson(`${API_BASE}/report/summary?${query}`);
  return normalizeSummary(response);
}

export async function getDetails(params = {}) {
  const query = buildQuery(params);
  const response = await fetchJson(`${API_BASE}/report/details?${query}`);
  return normalizeDetails(response);
}

export async function getTimeline(params = {}) {
  const query = buildQuery(params);
  const response = await fetchJson(`${API_BASE}/report/timeline?${query}`);
  return normalizeReport(response);
}

export async function getDevice(params = {}) {
  const query = buildQuery(params);
  const response = await fetchJson(`${API_BASE}/report/device?${query}`);
  return normalizeReport(response);
}

export async function getPageReport(params = {}) {
  const query = buildQuery(params);
  const response = await fetchJson(`${API_BASE}/report/page?${query}`);
  return normalizeReport(response);
}

export function getCsvDownloadUrl(params = {}) {
  const query = buildQuery(params);
  return `${API_BASE}/report/csv?${query}`;
}
