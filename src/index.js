import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import  {createContext} from 'react';
import Store from "./store/Store";
import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from "@apollo/client/link/context";
const httpLink = createHttpLink({
    uri: 'http://localhost:7000/graphql',
});
export const Context = createContext(null)
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('access_token');
    console.log(token)
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()

})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>

    <BrowserRouter>
    <Context.Provider value={{
        store: new Store(),
    }}>
      <App/>
    </Context.Provider>,
    </BrowserRouter>
    </ApolloProvider>,


);

