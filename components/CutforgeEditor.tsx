"use client";

import { Editor } from "@cutforge/editor";
import "@cutforge/editor/style.css";

// The real @cutforge/editor package in demo mode, themed to the deck and
// preloaded with two clips from this page. Loaded only when a visitor powers it on.
export default function CutforgeEditor() {
  return (
    <Editor
      demo
      theme={{
        base: "dark",
        accent: "#ffb547",
        accent2: "#5fd4e6",
        fontFamily: "var(--font-archivo), system-ui, sans-serif",
        colors: {
          background: "#08131f",
          surface: "#0d1b2a",
          surfaceRaised: "#11243a",
          surfaceOverlay: "#163049",
          border: "#24425f",
          text: "#e4ecf3",
          textDim: "#93a7bb",
          ok: "#6be38a",
        },
      }}
      preset={{
        media: [
          { url: "/media/blackhole-loop.mp4", name: "Kerr black hole" },
          { url: "/media/releve-drive.mp4", name: "Relevé drive" },
        ],
        arrange: "sequence",
        project: { name: "Portfolio reel", aspectRatio: "16:9" },
      }}
    />
  );
}
