export const debounce = <T extends Function>(func: T, wait = 100, immediate = false) => {
    let timeout: NodeJS.Timeout | null
    return () => {
        const later = () => {
            timeout = null
            if (!immediate) {
                func()
            }
        }
        let callNow = immediate && !timeout
        if (timeout !== null) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(later, wait)
        if (callNow) {
            func()
        }
    }
}
