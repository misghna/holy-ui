export const getSetting = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

export const setSetting = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
