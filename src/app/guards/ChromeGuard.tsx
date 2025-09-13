"use client";

import { useEffect, useState, ReactNode } from "react";
import NotSupported from "./not-supported";

interface Props {
  children: ReactNode;
}

export default function ChromeGuard({ children }: Props) {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const match = userAgent.match(/Chrome\/(\d+)/);

    if (match) {
      const version = parseInt(match[1], 10);
      setIsSupported(version >= 138);
    } else {
      setIsSupported(false);
    }
  }, []);

  if (isSupported === null) return null; // still loading
  if (!isSupported) return <NotSupported />;

  return <>{children}</>;
}
