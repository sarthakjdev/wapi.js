import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios'

export function createAxiosInstance(baseURl: string, headers: AxiosRequestHeaders): AxiosInstance {
    const client = axios.create({
        baseURL: baseURl,
        headers,
    })

    return client
}
