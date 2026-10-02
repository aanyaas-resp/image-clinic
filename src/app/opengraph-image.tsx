import { ImageResponse } from "next/og";

export const alt = "Image Clinic, hair and skin care in Delhi and Gurugram";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          backgroundColor: "#f4efe6",
          color: "#34271f",
          border: "18px solid #c9a13b",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#86672b" }}>
          IMAGE CLINIC
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 38,
            fontSize: 68,
            lineHeight: 1.1,
            fontWeight: 600,
          }}
        >
          Hair, skin &amp; aesthetic care
        </div>
        <div style={{ display: "flex", marginTop: 26, fontSize: 32, color: "#66564b" }}>
          Greater Kailash, Delhi · Gurugram
        </div>
        <div style={{ display: "flex", marginTop: 54, fontSize: 24, color: "#86672b" }}>
          www.imageclinicindia.co
        </div>
      </div>
    ),
    size,
  );
}
