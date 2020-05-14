import React, { useState, useEffect } from 'react'
import { Authenticator } from './Authenticator'
import { Informer } from './Informer'
import { CookiesProvider } from 'react-cookie'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const client = new ApolloClient({
    uri: 'http://192.168.1.23:8000/query'
})

export const App = () => {
    return (
        <CookiesProvider>
            <ApolloProvider client={client}>
                <Authenticator />
                <Informer />
            </ApolloProvider>
        </CookiesProvider>
    )
}
