
export default {
  users: [
    {
      id: 1,
      userName: 'user1'
    },
    {
      id: 2,
      userName: 'user2'
    },
    {
      id: 3,
      userName: 'user3'
    },
    {
      id: 4,
      userName: 'user4'
    },
  ],
  eventsAll: [
      {id: 'a', name: 'event1', location: 'location1', date: 'date1', keywords: ["hike", "bike"], description: 'description1', users_attending: ['user1', 'user2'], creator: 1},
      {id: 'b', name: 'event2', location: 'location2', date: 'date2', keywords: ["hike", "bike"], description: 'description2', users_attending: ['user1', 'user3'], creator: 1},
      {id: 'c', name: 'event3', location: 'location3', date: 'date3', keywords: ["hike", "bike"], description: 'description3', users_attending: ['user2', 'user2'], creator: 4},
      {id: 'd', name: 'event4', location: 'location4', date: 'date4', keywords: ["hike", "bike"], description: 'description4', users_attending: ['user1', 'user2'], creator: 3},
      {id: 'e', name: 'event5', location: 'location5', date: 'date5', keywords: ["hike", "bike"], description: 'description5', users_attending: ['user1', 'user4'], creator: 1},
      {id: 'f', name: 'event6', location: 'location6', date: 'date6', keywords: ["hike", "bike"], description: 'description6', users_attending: ['user1', 'user2'], creator: 2},
      {id: 'g', name: 'event7', location: 'location7', date: 'date7', keywords: ["hike", "bike"], description: 'description7', users_attending: ['user1', 'user3'], creator: 2},
      {id: 'h', name: 'event8', location: 'location8', date: 'date8', keywords: ["hike", "bike"], description: 'description8', users_attending: ['user3', 'user4'], creator: 1},
    ]
}