import React from "react";

import { Link, Route, Switch } from "react-router-dom";
import Homepage from "./home";
import MapContainer from "./map";
import { Menu, Icon} from "antd";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'home'
    };
    
  }
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <>
        <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick}>
          <Menu.Item>
            <Link to="/" className="navbar-brand" style={{color:'#1890ff'}}>
              GCTweet
            </Link>
          </Menu.Item>

          <Menu.Item key="home">
            
            <Link to="/"><Icon type="home" />Home</Link>
          </Menu.Item>

          <Menu.Item key="search">
            
            <Link to="/search"><Icon type="search" />Search Tweets</Link>
          </Menu.Item>
        </Menu>

        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/search" component={MapContainer} />
        </Switch>
      </>
    );
  }
}

export default NavigationBar;
