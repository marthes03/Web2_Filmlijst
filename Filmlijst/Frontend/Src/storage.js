export function safeParse(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromStorage(key, fallback = null) {
  return safeParse(localStorage.getItem(key), fallback); // Handhaaf de fallback-parameter (Slide 13)
}