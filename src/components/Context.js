// Context.js
import React from "react"

const dateEvent = new Date()
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}
const todayDate = dateEvent.toDateString("us-EN", dateOptions)


const defaultContextValue = {
  data: {
    // set your initial data shape here
    menuOpen: false,
    dateOfTheDay: todayDate,
    env: process.env.NODE_ENV,
  },
  set: () => {},
}

const { Provider, Consumer } = React.createContext(defaultContextValue)

class ContextProviderComponent extends React.Component {
  constructor() {
    super()

    this.setData = this.setData.bind(this)
    this.state = {
      ...defaultContextValue,
      set: this.setData,
    }
  }

  setData(newData) {
    this.setState(state => ({
      data: {
        ...state.data,
        ...newData,
      },
    }))
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export { Consumer as default, ContextProviderComponent }
