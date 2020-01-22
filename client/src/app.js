import React from 'react';
import NavigationBar from './components/nav';
import Homepage from './components/home';
import MapContainer from "./components/map";
import { Layout} from "antd";

const {Header, Content, Sider} = Layout;

function App() {
    return(
        <Layout>
            <Header>
                <NavigationBar />
            </Header>
            <Content>
                <Homepage />
                {/* <MapContainer /> */}
            </Content>
            <Sider>
                <div>
                    test
                </div>
            </Sider>


        </Layout>
    )
}

export default App;