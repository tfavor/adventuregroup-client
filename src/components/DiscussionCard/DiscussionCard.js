import React, { Component } from 'react';
import './DiscussionCard.css'
import ApiContext from '../../ApiContext'
import {  Link } from 'react-router-dom'
import config from '../../config'

class DiscussionCard extends Component {

  static contextType = ApiContext
 
  render() {
   const card = this.props.card
    console.log(this.props.card)
    return (
      <div className="discussionCard">
        {card.cardContent}
      </div>
    )
  }
}
export default DiscussionCard