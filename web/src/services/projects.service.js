import http from './base-api'

export function list() {
  return http.get('/projects').then((res) => res.data)
}


