import { useState } from "react";

export function TwiterCard({ userName, name = "unknown" }) {
  const [isFollowing, setisFollowing] = useState(false);
  const text = isFollowing ? "Siguiendo" : "Seguir";
  const buttonClassName = isFollowing
    ? "tw-card-button is-following"
    : "tw-card-button";

  const handleClick = () => {
    setisFollowing(!isFollowing);
  };

  return (
    <article className="tw-card">
      <header className="tw-card-header">
        <img
          className="tw-card-avatar"
          alt="Avatar random"
          src={"https://unavatar.io/${userName}"}
        />
        <div className="tw-card-info">
          <strong>{name}</strong>
          <span className="tw-card-infoName">@{userName}</span>
        </div>
      </header>

      <aside>
        <button className={buttonClassName} onClick={handleClick}>
          {text}
        </button>
      </aside>
    </article>
  );
}
