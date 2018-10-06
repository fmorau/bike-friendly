import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import {
    Home,
    Me,
    MapPage,
    Login,
    NotFound
} from '/imports/ui/pages';

import { Authenticated } from '/imports/ui/components'

import styled from 'styled-components';


const App = props => (
    <Router>
        <Switch>
            <Route exact name="index" path="/" component={Home}/>

            <Authenticated exact path="/profile" component={Me} {...props} />
            <Authenticated exact path="/map" component={MapPage} {...props} />

            <Route path="/login" component={Login} {...props} />

            <Route component={NotFound}/>
        </Switch>
    </Router>
);

// const App = props => (
//     <Router>
//         <Switch>
//             <Route exact path="/" component={Home}/>
//         </Switch>
//     </Router>
// );

App.defaultProps = {
    
};

App.propTypes = {
    
};

export default withTracker(() => {
    const loggingIn = Meteor.loggingIn();
    const user = Meteor.user();
    const userId = Meteor.userId();

    const authenticated = !loggingIn && !!userId;
    const loading = !!loggingIn && !!userId;

    const name = user && user.profile && user.profile.firstName && getUserName(user.profile);
    const emailAddress = user && user.emails && user.email;

    return {
        loggingIn,
        user,
        userId,
        authenticated,
        loading,
        name,
        emailAddress
    };
})(App);