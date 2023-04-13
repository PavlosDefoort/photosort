import { useState } from "react";

function RedditFlairs() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  async function login() {
    const clientId = "<your_client_id>";
    const redirectUri = "http://localhost:3000/callback";
    const scopes = "identity,flair,read";
    const url = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=random_string&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&duration=temporary&scope=${encodeURIComponent(scopes)}`;

    const win = window.open(url, "reddit_auth", "width=500,height=600");
    const timer = setInterval(() => {
      if (win.closed) {
        clearInterval(timer);
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        if (code) {
          getToken(code);
        } else {
          setError("Login failed");
        }
      }
    }, 1000);
  }

  async function getToken(code) {
    const clientId = "<your_client_id>";
    const clientSecret = "<your_client_secret>";
    const redirectUri = "http://localhost:3000/callback";
    const grantType = "authorization_code";
    const url = "https://www.reddit.com/api/v1/access_token";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: `grant_type=${encodeURIComponent(
        grantType
      )}&code=${encodeURIComponent(code)}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}`,
    });

    const data = await response.json();
    const token = data.access_token;
    getUser(token);
  }

  async function getUser(token) {
    const url = "https://oauth.reddit.com/api/v1/me";

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const username = data.name;
      const karma = data.total_karma;
      setUser({ username, karma });
    } else {
      setError("Failed to get user data");
    }
  }

  return (
    <div>
      <button onClick={login}>Log In</button>
      {user && (
        <div>
          <p>Logged in as {user.username}</p>
          <p>Karma: {user.karma}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default RedditFlairs;
