import { useEffect, useState } from "react";
import { redirectToAuthCodeFlow, getAccessToken } from "./auth";
import Player from "./player";
import "./App.css";

interface Track {
  id: string;
  name: string;
  uri: string; // 这个 uri 很重要，用于播放
  album: {
    images: { url: string }[];
    name: string;
  };
  artists: { name: string }[];
  external_urls: {
    spotify: string;
  };
}

interface SpotifyPlaylistItem {
  added_at: string;
  track: Track;
}

interface SpotifyResponse {
  items: SpotifyPlaylistItem[];
  total: number;
}

interface UserProfile {
  display_name: string;
  id: string;
  images: { url: string }[];
}

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      getAccessToken(code).then((accessToken) => {
        setToken(accessToken);
        window.history.replaceState({}, document.title, "/");
      });
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
        try {
            const profileRes = await fetch("https://api.spotify.com/v1/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const profileData = await profileRes.json();
            setProfile(profileData);
    
            const tracksRes = await fetch("https://api.spotify.com/v1/me/tracks?limit=20", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const tracksData: SpotifyResponse = await tracksRes.json();
            const formattedTracks = tracksData.items.map((item) => item.track);
            setTracks(formattedTracks);
        } catch(e) {
            console.error(e);
        }
    };

    fetchData();
  }, [token]);

  return (
    <div className="container">
      {!token ? (
        <div className="login-box">
          <h1>Spotify 自动播放器</h1>
          <button onClick={redirectToAuthCodeFlow}>登录并播放</button>
        </div>
      ) : (
        <div className="content">
          {profile && <h2>你好, {profile.display_name}! 👋</h2>}

          {/* 如果有 Token 且加载出了歌曲，显示播放器并传入第一首歌 */}
          {token && tracks.length > 0 && (
             <div className="player-wrapper">
                <h3>正在播放第一首红心歌曲：</h3>
                <Player token={token} trackUri={tracks[0].uri} />
             </div>
          )}
          
          <hr style={{margin: '30px 0', borderColor: '#333'}} />
          
          <h3>你的红心歌单列表</h3>
          <div className="track-list">
            {tracks.map((track) => (
              <div key={track.id} className="track-card">
                 {track.album.images && track.album.images.length > 0 ? (
                   <img src={track.album.images[0].url} alt={track.name} />
                 ) : (
                   <div className="no-image">🎵</div>
                 )}
                <div className="track-info">
                  <a href={track.external_urls.spotify} target="_blank" rel="noreferrer">
                    <strong>{track.name}</strong>
                  </a>
                  <p>{track.artists.map((a) => a.name).join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;