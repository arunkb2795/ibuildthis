"use client";

export default function IOSInstallPrompt() {
  if (typeof window === "undefined") return null;
  const ua = window.navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua);
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

  if (isIOS && isSafari && !isStandalone) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        right: 16,
        padding: 16,
        borderRadius: 12,
        background: "#111",
        color: "#fff",
        zIndex: 1000,
      }}
    >
      <strong>Install App</strong>
      <p style={{ marginTop: 8 }}>
        In Safari, tap the Share button and choose Add to Home Screen.
      </p>
    </div>
  );
}
