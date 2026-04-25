import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Register Service Worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js').then((registration) => {
			if (import.meta.env.DEV) {
				console.log('SW registered: ', registration);
			}
		}).catch((registrationError) => {
			if (import.meta.env.DEV) {
				console.log('SW registration failed: ', registrationError);
			}
		});
	});
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Could not find root element");

const root = ReactDOM.createRoot(rootElement);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
