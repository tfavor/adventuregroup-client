import React from 'react'

export default React.createContext({
    userId: '',
    eventsAll: [],
    eventsAttending: [],
    hikingEvents: [],
    bikingEvents: [],
    climbingEvents: [],
    campingEvents: [],
    waterEvents: [],
    otherEvents: [],
    discussionCards: [],
    discussionCardComments: [],
    handleAddEvent: () => {},
    deleteEvent: () => {},
    attendEvent: () => {},
    missOut: () => {},
    handleLogin: () => {},
    createCard: () => {},
})