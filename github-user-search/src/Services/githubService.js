import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

export const fetchUserData = async (
  username,
  location = "",
  minRepos = "",
  page = 1
) => {
  try {
    let query = username;

    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>=${minRepos}`;

    const url = `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`;

    const response = await axios.get(url, {
      headers: {
        Authorization: API_KEY ? `token ${API_KEY}` : undefined,
      },
    });

    return {
      items: response.data.items,
      total_count: response.data.total_count,
    };
  } catch {
    throw new Error("Failed to fetch GitHub search results");
  }
};

export const fetchUserDetails = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: API_KEY ? `token ${API_KEY}` : undefined,
        },
      }
    );
    return response.data;
  } catch {
    return null;
  }
};