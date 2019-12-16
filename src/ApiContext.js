import React from 'react'

export default React.createContext({
    user: '',
    eventsAll: [],
    discussionCards: [],
    discussionCardComments: [],
    handleAddEvent: () => {},
    deleteEvent: () => {},
    attendEvent: () => {},
    missOut: () => {},
    handleLogin: () => {},
    createCard: () => {},
})