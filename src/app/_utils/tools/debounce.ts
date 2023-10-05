
export const debounce = (callback: any, wait: any) => {
    let timeoutId: any = null;
    return (...args: any) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  }