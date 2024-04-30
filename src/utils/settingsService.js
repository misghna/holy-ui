export const getSetting = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

export const setSetting = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}
