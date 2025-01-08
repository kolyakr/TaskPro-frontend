export const saveToLocalStorage = (key: string, value: unknown): void => {
  try {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  } catch (err) {
    console.error(
      `Failed to save value: ${JSON.stringify(value)} to local storage. Error:`,
      err
    );
  }
};

export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const stringifiedValue = localStorage.getItem(key);

    if (stringifiedValue === null) {
      return null;
    }

    return JSON.parse(stringifiedValue) as T;
  } catch (err) {
    console.error(`Failed to parse value for key "${key}". Error:`, err);
    return null;
  }
};
