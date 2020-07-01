import React from "react";

import "./UserBannerImage.css";

export default function UserBannerImage({ imageUrl }) {
  return imageUrl ? (
    <div className="banner-outer-wrapper">
      <div className="banner-wrapper">
        <div className="banner-fill" />

        <div className="banner-inner-wrapper">
          <div
            className="banner-bgnd"
            style={{
              backgroundImage: `url("${imageUrl}")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              zIndex: "-1",
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
          <img
            className="banner-image"
            alt={`Banner profile background`}
            src={imageUrl}
          />
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        background: "lightgray",
        paddingBottom: "33%",
      }}
    ></div>
  );
}
