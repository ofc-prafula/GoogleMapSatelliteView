// ScriptCache.js - The backbone of this method which asynchronously loads JavaScript <script> tags on a page.
// It will only load a single <script> tag on a page per-script tag declaration. If it's already loaded on a page,
// it calls the callback from the onLoad event immediately.

let counter = 0;
const scriptMap = new Map();

export const ScriptCache = ((global: any) => {
  return function ScriptCacheFunction(scripts: any) {
    const Cache: any = {};
    Cache._onLoad = (key: any) => {
      return (cb: any) => {
        const stored = scriptMap.get(key);
        if (stored) {
          stored.promise.then(() => {
            stored.error ? cb(stored.error) : cb(null, stored);
          });
        }
      };
    };
    Cache._scriptTag = (key: any, src: any) => {
      if (!scriptMap.has(key)) {
        const tag: any = document.createElement("script");
        const promise = new Promise((resolve: any, reject: any) => {
          const body = document.getElementsByTagName("body")[0];
          tag.type = "text/javascript";
          tag.async = false; // Load in order
          const cbName = `loaderCB${counter++}${Date.now()}`;
          const handleResult = (state: any) => {
            return (evt: any) => {
              const stored = scriptMap.get(key);
              if (state === "loaded") {
                stored.resolved = true;
                resolve(src);
              } else if (state === "error") {
                stored.errored = true;
                reject(evt);
              }
              cleanup();
            };
          };
          const cleanup = () => {
            if (global[cbName] && typeof global[cbName] === "function") {
              global[cbName] = null;
            }
          };
          tag.onload = handleResult("loaded");
          tag.onerror = handleResult("error");
          tag.onreadystatechange = () => {
            handleResult(tag.readyState);
          };
          // Pick off callback, if there is one
          if (src.match(/callback=CALLBACK_NAME/)) {
            src = src.replace(/(callback=)[^\&]+/, `$1${cbName}`);
          } else {
            tag.addEventListener("load", tag.onload);
          }
          tag.addEventListener("error", tag.onerror);
          tag.src = src;
          body.appendChild(tag);
          return tag;
        });
        const initialState = {
          loaded: false,
          error: false,
          promise,
          tag
        };
        scriptMap.set(key, initialState);
      }
      return scriptMap.get(key);
    };
    Object.keys(scripts).forEach(key => {
      const script = scripts[key];
      Cache[key] = {
        tag: Cache._scriptTag(key, script),
        onLoad: Cache._onLoad(key)
      };
    });
    return Cache;
  };
})(window);

export default ScriptCache;
