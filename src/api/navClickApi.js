const API_BASE = 'https://test-tools.mrc-europe.com/v1/api/nav-click';

function buildQuery(params = {}) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.set(key, value);
        }
    });

    return searchParams.toString();
}

async function fetchJson(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.success === false) {
        throw new Error(data.message || 'API request failed');
    }

    return data;
}

export async function getSummary(params = {}) {
    const query = buildQuery(params);
    return fetchJson(`${API_BASE}/report/summary?${query}`);
}

export async function getDetails(params = {}) {
    const query = buildQuery(params);
    return fetchJson(`${API_BASE}/report/details?${query}`);
}

export async function getTimeline(params = {}) {
    const query = buildQuery(params);
    return fetchJson(`${API_BASE}/report/timeline?${query}`);
}

export async function getDevice(params = {}) {
    const query = buildQuery(params);
    return fetchJson(`${API_BASE}/report/device?${query}`);
}

export async function getPageReport(params = {}) {
    const query = buildQuery(params);
    return fetchJson(`${API_BASE}/report/page?${query}`);
}

export function getCsvDownloadUrl(params = {}) {
    const query = buildQuery(params);
    return `${API_BASE}/report/csv?${query}`;
}