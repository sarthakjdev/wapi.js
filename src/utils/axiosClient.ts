import axios, { AxiosInstance } from 'axios'

export function createAxiosInstance(baseURl: string, token: string): AxiosInstance {
    const client = axios.create({
        baseURL: baseURl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return client
}
