import React, { Component } from 'react'

export default class Begin extends Component {
    constructor () {
        super()

        this.state = {
            text: 'Hello World'
        }
    }

    handleClick (e) {
        e.preventDefault()

        this.setState({
            text: new Date().getTime()
        })
    }

    componentWillMount () {
        console.log('start')
    }

    componentDidMount () {
        console.log('launch')
    }

    componentDidUpdate () {
        console.log('update')
    }

    render () {
        return (
            <>
                <h1>{this.state.text}</h1>
                <button onClick={(e) => this.handleClick(e)}>Change</button>
            </>
        )
    }
}