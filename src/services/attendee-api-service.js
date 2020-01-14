import config from '../config'

const AttendeeService = {
  GetByUsername() {
    const user = window.sessionStorage.getItem('user_name')
    return fetch(`${config.API_ENDPOINT}/api/attending/by_user/${user}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.getItem(config.TOKEN_KEY)
      },
    })
    .then(attendeesRes => 
      (!attendeesRes.ok)
          ? attendeesRes.json().then(e => Promise.reject(e))
          : attendeesRes.json()
    )
    .then((attendees) => {
      return attendees
    })

  },
  PostNewAttendee(newAttendee) {
    return fetch(`${config.API_ENDPOINT}/api/attending`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(newAttendee),
    })
    .then(data => {
      return data
      })
  },
  DeleteAttendee(id) {
    return fetch(`${config.API_ENDPOINT}/api/attending/${id}`, {
        method: 'DELETE',
        headers: {
          'authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`,
          'content-type': 'application/json'
        },
    })
    .then(attendeesRes => 
      (!attendeesRes.ok)
          ? attendeesRes.json().then(e => Promise.reject(e))
          : attendeesRes.json()
    )
    .then(attendeesRes => {
      return attendeesRes
    })
  }
}  

export default AttendeeService