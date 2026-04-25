import.meta.env = {"BASE_URL": "/", "DEV": true, "MODE": "development", "PROD": false, "SSR": false};import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=5f241792"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import "/polyfills.ts";
import __vite__cjsImport2_react from "/node_modules/.vite/deps/react.js?v=5f241792"; const React = __vite__cjsImport2_react.__esModule ? __vite__cjsImport2_react.default : __vite__cjsImport2_react;
import __vite__cjsImport3_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=5f241792"; const ReactDOM = __vite__cjsImport3_reactDom_client.__esModule ? __vite__cjsImport3_reactDom_client.default : __vite__cjsImport3_reactDom_client;
import App from "/App.tsx";
import "/index.css";
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then((registration) => {
      if (import.meta.env.DEV) {
        console.log("SW registered: ", registration);
      }
    }).catch((registrationError) => {
      if (import.meta.env.DEV) {
        console.log("SW registration failed: ", registrationError);
      }
    });
  });
}
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Could not find root element");
const root = ReactDOM.createRoot(rootElement);
root.render(
  /* @__PURE__ */ jsxDEV(React.StrictMode, { children: /* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
    fileName: "D:/TuzlaTourApp/index.tsx",
    lineNumber: 28,
    columnNumber: 3
  }, this) }, void 0, false, {
    fileName: "D:/TuzlaTourApp/index.tsx",
    lineNumber: 27,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBMkJFO0FBM0JGLE9BQU87QUFDUCxPQUFPQSxXQUFXO0FBQ2xCLE9BQU9DLGNBQWM7QUFDckIsT0FBT0MsU0FBUztBQUNoQixPQUFPO0FBR1AsSUFBSSxtQkFBbUJDLFdBQVc7QUFDakNDLFNBQU9DLGlCQUFpQixRQUFRLE1BQU07QUFDckNGLGNBQVVHLGNBQWNDLFNBQVMsUUFBUSxFQUFFQyxLQUFLLENBQUNDLGlCQUFpQjtBQUNqRSxVQUFJQyxZQUFZQyxJQUFJQyxLQUFLO0FBQ3hCQyxnQkFBUUMsSUFBSSxtQkFBbUJMLFlBQVk7QUFBQSxNQUM1QztBQUFBLElBQ0QsQ0FBQyxFQUFFTSxNQUFNLENBQUNDLHNCQUFzQjtBQUMvQixVQUFJTixZQUFZQyxJQUFJQyxLQUFLO0FBQ3hCQyxnQkFBUUMsSUFBSSw0QkFBNEJFLGlCQUFpQjtBQUFBLE1BQzFEO0FBQUEsSUFDRCxDQUFDO0FBQUEsRUFDRixDQUFDO0FBQ0Y7QUFFQSxNQUFNQyxjQUFjQyxTQUFTQyxlQUFlLE1BQU07QUFDbEQsSUFBSSxDQUFDRixZQUFhLE9BQU0sSUFBSUcsTUFBTSw2QkFBNkI7QUFFL0QsTUFBTUMsT0FBT3BCLFNBQVNxQixXQUFXTCxXQUFXO0FBQzVDSSxLQUFLRTtBQUFBQSxFQUNKLHVCQUFDLE1BQU0sWUFBTixFQUNBLGlDQUFDLFNBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFJLEtBREw7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUVBO0FBQ0QiLCJuYW1lcyI6WyJSZWFjdCIsIlJlYWN0RE9NIiwiQXBwIiwibmF2aWdhdG9yIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlcnZpY2VXb3JrZXIiLCJyZWdpc3RlciIsInRoZW4iLCJyZWdpc3RyYXRpb24iLCJpbXBvcnQiLCJlbnYiLCJERVYiLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJyZWdpc3RyYXRpb25FcnJvciIsInJvb3RFbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIkVycm9yIiwicm9vdCIsImNyZWF0ZVJvb3QiLCJyZW5kZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9wb2x5ZmlsbHMnO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tL2NsaWVudCc7XHJcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xyXG5pbXBvcnQgJy4vaW5kZXguY3NzJztcclxuXHJcbi8vIFJlZ2lzdGVyIFNlcnZpY2UgV29ya2VyXHJcbmlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XHJcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcblx0XHRuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignL3N3LmpzJykudGhlbigocmVnaXN0cmF0aW9uKSA9PiB7XHJcblx0XHRcdGlmIChpbXBvcnQubWV0YS5lbnYuREVWKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ1NXIHJlZ2lzdGVyZWQ6ICcsIHJlZ2lzdHJhdGlvbik7XHJcblx0XHRcdH1cclxuXHRcdH0pLmNhdGNoKChyZWdpc3RyYXRpb25FcnJvcikgPT4ge1xyXG5cdFx0XHRpZiAoaW1wb3J0Lm1ldGEuZW52LkRFVikge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdTVyByZWdpc3RyYXRpb24gZmFpbGVkOiAnLCByZWdpc3RyYXRpb25FcnJvcik7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcblxyXG5jb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jyk7XHJcbmlmICghcm9vdEVsZW1lbnQpIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIHJvb3QgZWxlbWVudFwiKTtcclxuXHJcbmNvbnN0IHJvb3QgPSBSZWFjdERPTS5jcmVhdGVSb290KHJvb3RFbGVtZW50KTtcclxucm9vdC5yZW5kZXIoXHJcblx0PFJlYWN0LlN0cmljdE1vZGU+XHJcblx0XHQ8QXBwIC8+XHJcblx0PC9SZWFjdC5TdHJpY3RNb2RlPlxyXG4pO1xyXG4iXSwiZmlsZSI6IkQ6L1R1emxhVG91ckFwcC9pbmRleC50c3gifQ==