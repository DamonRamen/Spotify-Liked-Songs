import { useState, useEffect } from "react";

// 扩展 Window 接口，防止 TS 报错
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

interface PlayerProps {
  token: string;
  trackUri: string;
}

export default function Player({ token, trackUri }: PlayerProps) {
  const [player, setPlayer] = useState<any>(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: '我的红心歌单播放器',
        getOAuthToken: (cb: any) => { cb(token); },
        volume: 0.5
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Ready with Device ID', device_id);
        // 播放器就绪后，直接调用 API 播放第一首歌
        playSong(device_id, trackUri, token);
      });

      player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', (state: any) => {
        if (!state) return;
        setTrack(state.track_window.current_track);
        setPaused(state.paused);
        player.getCurrentState().then((state: any) => { 
          (!state) ? setActive(false) : setActive(true); 
        });
      });

      player.connect();
    };
  }, [token, trackUri]);

  // 调用 Spotify API 进行播放
  const playSong = async (deviceId: string, uri: string, accessToken: string) => {
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        uris: [uri],
      }),
    });
  };

  if (!player) return <div>正在加载播放器 SDK...</div>;

  return (
    <div className="player-container">
       <div className="main-wrapper">
         {current_track ? (
             <>
                <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />
                <div className="now-playing__side">
                  <div className="now-playing__name">{current_track.name}</div>
                  <div className="now-playing__artist">{current_track.artists[0].name}</div>
                  <button className="btn-spotify" onClick={() => { player.togglePlay() }}>
                    {is_paused ? "▶️ 播放" : "⏸ 暂停"}
                  </button>
                </div>
             </>
         ) : (
             <div className="loading-text">
                <p>播放器已就绪，正在缓冲...</p>
             </div>
         )}
      </div>
    </div>
  );
}