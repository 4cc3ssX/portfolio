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
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Subtle gradient orb */}
        <div
          style={{
            position: "absolute",
            left: "20%",
            top: "30%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Top gradient line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />

        {/* Corner accents - Top Left */}
        <div
          style={{
            position: "absolute",
            left: "60px",
            top: "60px",
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "60px",
            top: "60px",
            width: "40px",
            height: "1px",
            background:
              "linear-gradient(to right, rgba(255,255,255,0.3), transparent)",
          }}
        />

        {/* Corner accents - Bottom Right */}
        <div
          style={{
            position: "absolute",
            right: "60px",
            bottom: "60px",
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to top, rgba(255,255,255,0.3), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "60px",
            bottom: "60px",
            width: "40px",
            height: "1px",
            background:
              "linear-gradient(to left, rgba(255,255,255,0.3), transparent)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "80px 100px",
          }}
        >
          {/* Status badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  background: "#22c55e",
                  boxShadow: "0 0 12px rgba(34, 197, 94, 0.6)",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: "500",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Available for work
              </span>
            </div>
          </div>

          {/* Main heading */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginBottom: "32px",
            }}
          >
            <h1
              style={{
                fontSize: "72px",
                fontWeight: "600",
                color: "white",
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Building software
            </h1>
            <h1
              style={{
                fontSize: "72px",
                fontWeight: "600",
                color: "rgba(255,255,255,0.5)",
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              that scales
            </h1>
          </div>

          {/* Name & role */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "48px",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                color: "rgba(255,255,255,0.8)",
                fontWeight: "500",
              }}
            >
              {configs.name}
            </span>
            <span
              style={{
                fontSize: "20px",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              ·
            </span>
            <span
              style={{
                fontSize: "20px",
                color: "rgba(255,255,255,0.8)",
                fontWeight: "500",
              }}
            >
              Software Engineer
            </span>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "60px",
            }}
          >
            {[
              { value: "5+", label: "Years" },
              { value: "15+", label: "Projects" },
              { value: "20+", label: "Open Source" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "32px",
                    fontWeight: "600",
                    color: "white",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "500",
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side decorative element */}
        <div
          style={{
            position: "absolute",
            right: "100px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                width: "2px",
                height: i === 2 ? "40px" : "20px",
                background:
                  i === 2
                    ? "rgba(255,255,255,0.4)"
                    : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "100px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "1px",
              background: "rgba(255,255,255,0.3)",
            }}
          />
          <span
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.05em",
            }}
          >
            ryamjs.dev
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
