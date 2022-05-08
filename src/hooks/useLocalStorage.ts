import { useState } from 'react'

// Hook
function UseLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue
      }

      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (error: any) {
      console.error(error)
      return initialValue
    }
  })

  // set value
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error: any) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}

export default UseLocalStorage
