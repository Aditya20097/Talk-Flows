import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme : localStorage.getItem("talkflows-theme") ||  "coffee",
    setTheme :(theme) => {
        localStorage.setItem("talkflows-theme" , theme)
        set({theme})
    }
}))

