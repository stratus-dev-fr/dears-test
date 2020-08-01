import React, { useEffect } from 'react'

import axios from 'axios'

export default function API () {
    useEffect(() => {
        axios({
            method: 'post',
            url: '/API',
            data: {
                firstName: 'Finn',
                lastName: 'Williaws'
            }
        })
    })

    return (
        <h1>Hello World</h1>
    )
}