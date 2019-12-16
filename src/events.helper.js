
export const eventListFunction = (eventsAll, searchType) => 
  eventsAll.filter(event => event.type === searchType)

export const attendingFunction = (eventsAll, user) => 
  eventsAll.filter(event => event.users_attending.includes(user.userName))

export const createdFunction = (eventsAll, user) =>
  eventsAll.filter(event => event.creator === user.id)
