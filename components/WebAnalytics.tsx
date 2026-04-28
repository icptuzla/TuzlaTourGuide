import React, { Suspense, lazy } from 'react';
import { Capacitor } from '@capacitor/core';

const Analytics = lazy(async () => {
  const mod = await import('@vercel/analytics/react');
  return { default: mod.Analytics };
});

const WebAnalytics: React.FC = () => {
  if (!import.meta.env.PROD || Capacitor.getPlatform() !== 'web') {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  );
};

export default WebAnalytics;
