import http from './http'
import { ENDPOINTS } from './endpoints'

const ep = ENDPOINTS.products

export default {
  list()           { return http.get(ep.list) },
  store(data)      { return http.post(ep.store, data) },
  show(id)         { return http.get(ep.show(id)) },
  update(id, data) { return http.put(ep.update(id), data) },
  destroy(id)      { return http.delete(ep.destroy(id)) },
}