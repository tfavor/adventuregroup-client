import React, { Component } from 'react';
import ApiContext from '../../ApiContext'
import './DiscussionBoard.css'
import config from '../../config'
import DiscussionCard from '../DiscussionCard/DiscussionCard'

class DiscussionBoard extends Component {
 
  constructor(props) {
    super(props) 
    this.state = {
      cards: null,
      eventId: props.eventId
    }
  }

  static contextType = ApiContext

  handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.cardContent.value
    const newDiscussionCard = {
      id: Math.random(), 
      cardContent: value, 
      user_id: this.context.user.userName, 
      event_id: this.props.eventId
    }
    this.context.createCard(newDiscussionCard)
    this.setState({
      cards: this.context.discussionCards
    })
  }

  renderDelete = (card) => {

    if(card.user_id === this.context.user.id) {
      return (
        <button className="delete-card" onClick={e => this.handleDelete(card.id)}>delete</button>
      )
    }
  }

  handleDelete = (e) => {
    const id = e
    this.context.deleteCard(id)
  }

  function = () => {
    console.log(this.state)
    let discussionCards = []
    if(this.state.cards === null) {
      console.log("using props")
      discussionCards = this.props.cards
    } else {
      console.log("using state")
      discussionCards = this.state.cards
    }
    return discussionCards
  }

  render() {
    const discussionCards = this.function()
    const eventId = this.props.eventId
    const id = parseInt(eventId, 10)
    const cards = discussionCards.filter(card => card.event_id === id)
    console.log(this.state)
    return (
      <div className="discussion-board">
        <form className="discussion-board-form" onSubmit={this.handleSubmit}>
          <textarea name="cardContent" placeholder="ask any question or share any idea"></textarea>
          <button type="submit">submit</button>
          <ul className=''>
          {cards.map(card =>
            <li key={card.id}>
             <DiscussionCard
             card={card}
             />
             {this.renderDelete(card)}
            </li>
            )}
        </ul>
        </form>
      </div>
    )
  }
}
export default DiscussionBoard