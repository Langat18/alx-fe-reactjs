import { useState } from "react";
import { fetchUserData, fetchUserDetails } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() === "") return;

    setLoading(true);
    setError("");
    setUsers([]);
    setPage(1);

    try {
      const results = await fetchUserData(
        username.trim(),
        location.trim(),
        minRepos.trim(),
        1
      );

      if (results.items.length === 0) {
        setError("Looks like we cant find the user");
      } else {
        const detailedUsers = await Promise.all(
          results.items.map(async (u) => {
            const details = await fetchUserDetails(u.login);
            return { ...u, ...details };
          })
        );
        setUsers(detailedUsers);
        setTotalCount(results.total_count);
      }
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const results = await fetchUserData(
        username.trim(),
        location.trim(),
        minRepos.trim(),
        nextPage
      );

      const detailedUsers = await Promise.all(
        results.items.map(async (u) => {
          const details = await fetchUserDetails(u.login);
          return { ...u, ...details };
        })
      );

      setUsers((prev) => [...prev, ...detailedUsers]);
      setPage(nextPage);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-xl shadow-lg">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Minimum Repositories (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Status */}
      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Results */}
      {users.length > 0 && (
        <div className="mt-6 space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 border p-3 rounded-lg"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="font-bold">{user.name || user.login}</h2>
                <p className="text-sm text-gray-500">
                  {user.location || "No location provided"}
                </p>
                <p className="text-sm text-gray-500">
                  Public Repos: {user.public_repos}
                </p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}

          {/* Load More Button */}
          {users.length < totalCount && (
            <button
              onClick={loadMore}
              className="w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}