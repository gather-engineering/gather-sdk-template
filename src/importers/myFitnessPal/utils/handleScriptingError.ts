export const handleScriptingError = (results: chrome.scripting.InjectionResult<any>[]) => {
  if (chrome.runtime.lastError || !results || !results.length) {
    console.warn('Failed to execute script:', chrome.runtime.lastError?.message);
  }
};
