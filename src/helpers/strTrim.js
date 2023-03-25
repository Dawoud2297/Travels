const trimStr = str => {
    let start = str.indexOf(">") + 1
    let end = str.indexOf("/") - 1
    return str.slice(start, end)
}
export default trimStr