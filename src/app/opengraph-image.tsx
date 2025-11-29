import { ImageResponse } from "next/og";
import { configs } from "@/shared/configs/site";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = `${configs.name} - Software Engineer`;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
          }}
        />

        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "80px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "6px",
                borderRadius: "4px",
                background: "#3b82f6",
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
              }}
            />
            <span
              style={{
                fontSize: "24px",
                color: "rgba(255,255,255,0.7)",
                fontWeight: "500",
                letterSpacing: "0.05em",
              }}
            >
              PORTFOLIO
            </span>
          </div>

          {/* Main content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <h1
              style={{
                fontSize: "96px",
                fontWeight: "700",
                color: "white",
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {configs.name}
            </h1>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "42px",
                  color: "rgba(255,255,255,0.9)",
                  margin: 0,
                  fontWeight: "600",
                }}
              >
                Software Engineer
              </p>

              <p
                style={{
                  fontSize: "28px",
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                  maxWidth: "900px",
                  lineHeight: 1.5,
                }}
              >
                Building scalable, event-driven systems with NestJS, Next.js,
                React Native, and AWS
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
                fontSize: "20px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span>NestJS</span>
              <span>•</span>
              <span>Next.js</span>
              <span>•</span>
              <span>React Native</span>
              <span>•</span>
              <span>AWS</span>
            </div>

            <span
              style={{
                fontSize: "20px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              ryamjs.dev
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
