import React from 'react';
import './fonts.css';
import { Link, Route, Switch } from 'react-router-dom';
import MapContainer from "./map";
class Homepage extends React.Component {
    render(){
        return(
            <div>
                <div className='container' style={{marginTop:'20%'}}>
                    <h1 className="display-1 permanent-marker" style={{margin:'auto', maxWidth:'65.5%', fontSize:'10rem'}}>GCTweet</h1>
                    <button type="button" class="btn btn-outline-dark btn-lg" style={{marginLeft:'45%', marginTop:'1%'}}><Link to="/search" style={{color:'black'}}>Start</Link></button>
                </div>
                <div>
                    <Switch>
                        <Route exact path="/search" component={MapContainer}/>
                    </Switch>
                </div>
            </div>
            
        )
    }
};

export default Homepage;