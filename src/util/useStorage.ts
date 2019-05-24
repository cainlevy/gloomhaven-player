import { useState } from 'react';

function useStorage<T>(name: string, emptyValue: T): [T, (v: T) => void] {
  const currentValue = window.sessionStorage.getItem(name);
  const [value, updateValue] = useState<T>(currentValue ? JSON.parse(currentValue) : emptyValue);

  const setItem = (newValue: T) => {
    updateValue(newValue);
    window.sessionStorage.setItem(name, JSON.stringify(newValue));
  }

  return [value, setItem];
}

export default useStorage;
