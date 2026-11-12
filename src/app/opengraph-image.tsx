import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site, positioning } from "@/lib/site";

export const alt = `${site.name}: bespoke carpentry and joinery`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const root = process.cwd();
  const [img, inter] = await Promise.all([
    readFile(path.join(root, "public/img/projects/pool-house/01-finished-pool-house-black-cladding-bifolds.jpg")),
    readFile(path.join(root, "src/app/fonts/Inter-Medium.otf")),
  ]);
  const src = `data:image/jpeg;base64,${img.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 630, display: "flex", position: "relative", background: "#1a1612", fontFamily: "Inter" }}>
        <img src={src} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover", objectPosition: "50% 40%", opacity: 0.9 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(180deg, rgba(26,22,18,0.1) 25%, rgba(26,22,18,0.96) 100%)" }} />
        <div style={{ position: "absolute", left: 64, bottom: 56, width: 1072, display: "flex", flexDirection: "column", color: "#f5f1ea" }}>
          <div style={{ fontSize: 20, letterSpacing: 5, color: "#b9834a", marginBottom: 18 }}>CARPENTRY & JOINERY</div>
          <div style={{ fontSize: 64, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>{positioning.headline}</div>
          <div style={{ fontSize: 24, marginTop: 24, color: "rgba(245,241,234,0.8)" }}>{`${site.name} · ${site.phone}`}</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Inter", data: inter, weight: 500, style: "normal" }] },
  );
}
