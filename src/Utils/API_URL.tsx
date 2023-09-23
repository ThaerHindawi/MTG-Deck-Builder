export default function API_LOCAL_URL(param: string) {
    if(param.charAt(0) === '/') {
        param = param.replace(/(^\/)/, '')
    }
    return `http://localhost:8080/${param}`
}