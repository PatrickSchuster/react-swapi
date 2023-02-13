export function getPersonIdFromUrl(url) {
    if (!url) {
        return
    }
    if (url[url.length-1] === "/") {
        return url.split("/").at(-2)
    }
    return url.split("/").at(-1)
}