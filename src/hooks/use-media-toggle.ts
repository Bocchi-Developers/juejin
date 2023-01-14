import { runInAction } from 'mobx'
import { useEffect, useState } from 'react'

import { useStore } from '~/store'
import { isServerSide } from '~/utils/env'

interface DarkModeConfig {
  classNameDark?: string // A className to set "dark mode". Default = "dark-mode".
  classNameLight?: string // A className to set "light mode". Default = "light-mode".
  element?: HTMLElement | undefined | null // The element to apply the className. Default = `document.body`
  storageKey?: string // Specify the `localStorage` key. Default = "darkMode". Sewt to `null` to disable persistent storage.
}

const useDarkMode = (
  initialState: boolean | undefined,
  options: DarkModeConfig,
) => {
  const {
    classNameDark = 'dark',
    classNameLight = 'light',
    storageKey,
    element,
  } = options

  const [darkMode, setDarkMode] = useState(initialState)

  useEffect(() => {
    const presentedDarkMode = storageKey
      ? isServerSide()
        ? null
        : localStorage.getItem(storageKey)
      : null

    if (presentedDarkMode !== null) {
      if (presentedDarkMode === 'true') {
        setDarkMode(true)
      } else if (presentedDarkMode === 'false') {
        setDarkMode(false)
      }
    } else if (typeof initialState === 'undefined') {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [storageKey])

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => {
      const storageValue = localStorage.getItem(storageKey || 'darkMode')
      if (storageValue === null) {
        setDarkMode(e.matches)
      }
    }

    const focusHandler = () => {
      const storageValue = localStorage.getItem(storageKey || 'darkMode')
      if (storageValue === null) {
        setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
      }
    }

    window.addEventListener('focus', focusHandler)
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handler)

    return () => {
      window.removeEventListener('focus', focusHandler)
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handler)
    }
  }, [storageKey])

  useEffect(() => {
    if (isServerSide()) {
      return
    }

    if (darkMode) {
      document.body.setAttribute('arco-theme', 'dark')
    } else {
      document.body.removeAttribute('arco-theme')
    }
  }, [classNameDark, classNameLight, darkMode, element])

  if (isServerSide()) {
    return {
      toggle: () => {},
      value: false,
    }
  }

  return {
    value: darkMode,
    toggle: () => {
      setDarkMode((d) => {
        if (storageKey && !isServerSide()) {
          localStorage.setItem(storageKey, String(!d))
        }

        return !d
      })
    },
  }
}

const noop = () => {}

const mockElement = {
  classList: {
    add: noop,
    remove: noop,
  },
}
const darkModeKey = 'darkMode'
export const useMediaToggle = () => {
  const { appStore: app } = useStore()
  const { toggle, value } = useDarkMode(undefined, {
    classNameDark: 'dark',
    classNameLight: 'light',
    storageKey: darkModeKey,
    element: (globalThis.document && document.documentElement) || mockElement,
  })

  useEffect(() => {
    runInAction(() => {
      app.colorMode = value ? 'dark' : 'light'
    })
  }, [app, value])

  useEffect(() => {
    const handler = () => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches === value) {
        localStorage.removeItem(darkModeKey)
      }
    }
    window.addEventListener('beforeunload', handler)

    return () => {
      window.removeEventListener('beforeunload', handler)
    }
  }, [value])

  return {
    toggle,
    value,
  }
}
