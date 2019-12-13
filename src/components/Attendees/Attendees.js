import React, { Component } from 'react';
import './Attendees.css'
import ApiContext from '../../ApiContext'
import config from '../../config'

class Attendees extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: this.props.event.users_attending,
      itemsToShow: 3,
      expanded: false,
    }
  }

  static contextType = ApiContext;

  showMore = () => {
    this.state.itemsToShow === 3 ? (
      this.setState({ itemsToShow: this.state.users.length, expanded: true })
    ) : (
      this.setState({ itemsToShow: 3, expanded: false })
    )
  }

  render() {
    console.log(this.state.users.length)
    return (
      <div className="user-list-container">
        <div className="users-list-header">{this.state.users.length} going</div>
          <ul className="user-list">
           {this.state.users.slice(0, this.state.itemsToShow).map((user, i) =>
            <li key={i} className="user">
              <div>
                <h3>{user}</h3>
              </div>
            </li>
            )}
          </ul>
          <button  onClick={this.showMore}>
            {this.state.expanded ? (
              <span>Show less</span>
            ) : (
              <span>Show more</span>
            )}
          </button>
      </div>
    )
  }
}

export default Attendees
