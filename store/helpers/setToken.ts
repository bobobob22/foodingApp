import { OpenAPI } from '../../api/api'

export function setToken(token: string): void {
  OpenAPI.TOKEN = token
}

export function removeToken(): void {
  OpenAPI.TOKEN = ''
}
