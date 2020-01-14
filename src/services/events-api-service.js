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
          
          /*this.fetchAttending()*/
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
  DeleteEvent() {

  },

}

export default EventApiService

