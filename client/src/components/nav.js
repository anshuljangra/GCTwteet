import React from 'react';

import { Link, Route, Switch } from 'react-router-dom';
import Homepage from './home';
import MapContainer from "./map";

class NavigationBar extends React.Component {
    render(){
        return(
            <div>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                        <Link to="/" className="navbar-brand" style={{color:'white'}}>GCTweet</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link" style={{color:'white'}}>Home</Link> <span className="sr-only">(current)</span>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/search" style={{color:'white'}}>Search Tweets</Link>
                            </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <div>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route exact path="/search" component={MapContainer}/>
                </Switch>
                </div>
            
            </div>
            
        )
    }
};

export default NavigationBar;