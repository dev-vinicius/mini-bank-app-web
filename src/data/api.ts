import { env } from '@/env'
export function api(path: string, init?: RequestInit) {
  const baseUrl = env.API_URL
  const url = new URL('/api'.concat(path), baseUrl)

  return fetch(url, init)
}
