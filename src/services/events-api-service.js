import config from '../config'

const EventApiService = {
  GetAllEvents() {
    return fetch(`${config.API_ENDPOINT}/api/events`)
      .then((eventsRes) => {
          if (!eventsRes.ok)
          throw new Error(eventsRes.status)

          return eventsRes.json()
      })
      .then(events => {
        return events
      })
  },
  PostEvent(newEvent) {
    return fetch(`${config.API_ENDPOINT}/api/events`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem(config.TOKEN_KEY),
        'content-type': 'application/json'
      },
      body: JSON.stringify(newEvent),
    })
    .then((eventsRes) => {
      if (!eventsRes.ok)
      throw new Error(eventsRes.status)

      return eventsRes.json()
    })
    .then(res => {
      return res
    })
  },
  DeleteEvent(id) {
    return fetch(`${config.API_ENDPOINT}/api/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem(config.TOKEN_KEY),
        'content-type': 'application/json'
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.send
    )
    .then(res => {
        return res
    })
    .catch(err => {
      console.error(err)
    })
  },

}

export default EventApiService

