interface LocalStorageHandler {
    userHasLoggedIn: boolean
}

const local = localStorage
const localStorageHandler = {
    getItem: (keys: keyof LocalStorageHandler) => {
        const value = localStorage.getItem(keys)
        return value ? JSON.parse(value) : value
    },
    setItem: (props: LocalStorageHandler) => {
        for (const key in props) {
            const value = props[key as keyof LocalStorageHandler]
            local.setItem(key, JSON.stringify(value))
        }
    },
    removeItem: (keys: keyof LocalStorageHandler) => {
        localStorage.removeItem(keys)
    }

}

export default localStorageHandler