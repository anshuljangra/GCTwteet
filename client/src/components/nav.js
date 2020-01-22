import React from "react";

import { Link, Route, Switch } from "react-router-dom";
import Homepage from "./home";
import MapContainer from "./map";
import { Menu} from "antd";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'home'
    };
    
  }
  render() {
    return (
      <>
        <Menu mode="horizontal" selectedKeys={[this.state.current]}>
          <Menu.Item key="home">
            <Link to="/" className="navbar-brand">
              GCTweet
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/search">Search Tweets</Link>
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
