import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/repo/user/${userId}`
        );

        const data = await response.json();

        setRepositories(data.repositories || []);
      } catch (err) {
        console.error("Error while fetching repositories:", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/repo/all"
        );

        const data = await response.json();

        setSuggestedRepositories(data || []);
      } catch (err) {
        console.error("Error while fetching suggested repositories:", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />

      <section id="dashboard">

        {/* LEFT SIDE */}
        <aside className="dashboard-sidebar left-sidebar">
          <h3>Suggested Repositories</h3>

          <div className="repository-list">
            {suggestedRepositories.length > 0 ? (
              suggestedRepositories.map((repo) => (
                <div
                  className="repository-card"
                  key={repo._id}
                >
                  <h4>{repo.name}</h4>

                  {repo.description && (
                    <p>{repo.description}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="empty-message">
                No suggested repositories
              </p>
            )}
          </div>
        </aside>

        {/* CENTER */}
        <main className="repositories-main">

          <h2>Your Repositories</h2>

          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
            />
          </div>

          <div className="repository-results">

            {searchResults.length > 0 ? (
              searchResults.map((repo) => (
                <div
                  className="repository-card"
                  key={repo._id}
                >
                  <h4>{repo.name}</h4>

                  {repo.description && (
                    <p>{repo.description}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="empty-message">
                No repositories found.
              </p>
            )}

          </div>

        </main>

        {/* RIGHT SIDE */}
        <aside className="dashboard-sidebar right-sidebar">

          <h3>Upcoming Events</h3>

          <ul>
            <li>Tech Conference - Dec 15</li>
            <li>Developer Meetup - Dec 25</li>
            <li>React Summit - Jan 5</li>
          </ul>

        </aside>

      </section>
    </>
  );
};

export default Dashboard;