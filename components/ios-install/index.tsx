"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [installed, setInstalled] = useState(false);

  const isIOS =
    typeof window !== "undefined" &&
    /iphone|ipad|ipod/i.test(
      window.navigator.userAgent
    );

  // derive initial installed state directly
  const isStandalone =
    typeof window !== "undefined" &&
    (
      window.matchMedia("(display-mode: standalone)")
        .matches ||
      // @ts-ignore
      window.navigator.standalone === true
    );

  const isInstalled = installed || isStandalone;

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();

      setDeferredPrompt(
        e as BeforeInstallPromptEvent
      );
    };

    const onInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handler
    );

    window.addEventListener(
      "appinstalled",
      onInstalled
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );

      window.removeEventListener(
        "appinstalled",
        onInstalled
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();

    const result =
      await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  if (isInstalled) return null;

  if (isIOS) {
    return (
      <div className="rounded-xl border p-4">
        <p className="font-semibold mb-2">
          Install on iPhone
        </p>

        <ol className="list-decimal ml-5 text-sm space-y-1">
          <li>Tap Share in Safari</li>
          <li>Tap “Add to Home Screen”</li>
          <li>Tap “Add”</li>
        </ol>
      </div>
    );
  }

  if (deferredPrompt) {
    return (
      <button
        onClick={handleInstall}
        className="px-4 py-2 rounded-lg bg-black text-white"
      >
        Install App
      </button>
    );
  }

  return null;
}