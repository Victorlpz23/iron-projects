import http from './base-api'

export default function create(student) {
  return http.post('/students', student).then((res) => res.data)
}
