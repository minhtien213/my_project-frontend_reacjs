
export const setLocalStorage = (data_name, data) => {
  try {
    const stringData = JSON.stringify(data);
    localStorage.setItem(`${data_name}`, stringData);
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

export const getLocalStorage = (data_name) => {
  try {
    const data = localStorage.getItem(`${data_name}`);
    if (data === null) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return undefined;
  }
};
