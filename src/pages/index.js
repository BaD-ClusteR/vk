import React from "react";
import LocalAPI from "../components/local-api";
import connect from "@vkontakte/vk-connect";
import {PanelHeader, Div} from "@vkontakte/vkui";

class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.localAPI = new LocalAPI();
        this.state = {
            userName: null,
            alreadyVisited: true
        };
    }

    componentDidMount() {
        connect.subscribe((e) => {
            if (e.detail.type === "VKWebAppGetUserInfoResult") {
                this.setState({userName: e.detail.data.first_name});
                this.localAPI.checkIfUserVisitedFirstTime(e.detail.data.id, (result) => {
                    if (!result) {
                        this.setState({alreadyVisited: false});
                        this.localAPI.addVisitor(e.detail.data.id);
                    }
                });
            }
        });
        connect.send("VKWebAppGetUserInfo", {});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps);
    }

    render() {
        return (
            <React.Fragment>
                <PanelHeader>Hello{this.state.userName && `, ${this.state.userName}`}!</PanelHeader>
                {!this.state.alreadyVisited && <Div>Trench false cat shark tiger shark lemon shark shark; smelt roanoke bass; nurseryfish butterflyfish: sailbearer loach goby. Boxfish longfin pumpkinseed sailback scorpionfish; Pacific trout kahawai southern flounder salmon shark triggerfish butterfly ray. Razorfish walking catfish Blind shark turkeyfish oldwife electric catfish lined sole red snapper gurnard, bull trout olive flounder! Redmouth whalefish aruana albacore jewel tetra; spiderfish rockweed gunnel wrasse wrasse hillstream loach king of herring blackfish Sundaland noodlefish barfish smoothtongue kokopu.</Div>}
            </React.Fragment>
        );
    }
}

export default IndexPage;