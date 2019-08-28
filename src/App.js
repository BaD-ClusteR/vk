import React from 'react';
import {ConfigProvider, View, Panel, Root} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';
import IndexPage from "./pages/index";
import ProductsPage from "./pages/products";
//import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Icon20WorkOutline from '@vkontakte/icons/dist/20/work_outline';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStory: "index"
        };
        this.onStoryChange = this.onStoryChange.bind(this);
    }

    onStoryChange(e) {
        this.setState({ activeStory: e.currentTarget.dataset.story })
    }

    render() {

        //const os = platform();

        return (
            <ConfigProvider isWebView={true}>
                <Root activeView="index">
                    <View id="index" activePanel="panel_index">
                        <Panel id="panel_index">
                            <IndexPage />
                        </Panel>
                    </View>
                    <View id="products" activePanel="panel_products">
                        <Panel id="panel_products">
                            <ProductsPage />
                        </Panel>
                    </View>
                </Root>
            </ConfigProvider>
        )
    }
}

export default App;