import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import HomeScreen from './pages/home';
import DetailsScreen from './pages/details';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={HomeScreen} />
      <Route exact path="/:id" component={DetailsScreen} />
      <Redirect from="*" to="/" />
    </BrowserRouter>
  )
}