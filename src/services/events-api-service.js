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
  GetByLocation(location) {
    return fetch(`${config.API_ENDPOINT}/api/events/location/:location`)
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
  getIPAddress() {
    return fetch('https://api.ipdata.co?api-key=d9b75be99197c453a37239d7f91ec5dbe7f450e35e4283466027a8aa')
    .then(
      function success(response) {
          console.log('User\'s Location Data is ', response);
          console.log('User\'s Country', response.country);
      },

      function fail(data, status) {
          console.log('Request failed.  Returned status of',
                      status);
      }
    );
  }

}

export default EventApiService
