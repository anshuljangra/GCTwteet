import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import MapContainer from "./map";
import './fonts.css';
import './kanye.css';

class Homepage extends React.Component {
    render(){
        return(
            <>
                <div className='container home'>
                    <h1 className="display-1 permanent-marker display">GCTweet</h1>
                    <Link to="/search" className="btn btn-outline-dark start">Start</Link>
                </div>
                
                <Switch>
                    <Route exact path="/search" component={MapContainer}/>
                </Switch>
                
            </>
            
        )
    }
};

export default Homepage;