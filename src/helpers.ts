import {useEffect, useState} from 'react';

export function formatData(data: any) {
    return Object.values(data).map((el: any, idx) => {
        const newKeys = Object.keys(data)
        el.id = newKeys[idx]
        return el
    })
}

export function formatDate(date: string) {
    return date.toLocaleString().slice(0, 10).split('/').join('.')
}

export function useWindowSize() {
    const [width, setWidth] = useState<undefined | number>(undefined)

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return width
}
