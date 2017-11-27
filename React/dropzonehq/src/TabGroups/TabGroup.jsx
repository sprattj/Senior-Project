import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';


/*

    A TabGroup is a group of tabs on a container that changes the content
    of the container when the currently selected tab is changed.

    A TabGroup takes 2 props, an array of tab headings, and an array of tab
    content. The indices of the 2 arrays must match up for the correct content
    to be displayed on the active tab.
*/
export default class TabGroup extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
 
        this.state = {
            activeTab: this.props.activeTab
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            activeTab: nextProps.activeTab  
        })
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    getNavTabs(tabNames) {
        var tabs = [];
        for (var ndx = 0; ndx < tabNames.length; ndx++) {

            var nextTab = (
                <NavItem key={ndx}>
                    <NavLink className={classnames({ active: this.state.activeTab === ndx })} onClick={this.toggle.bind(this, ndx)}>
                        {tabNames[ndx]}
                    </NavLink>
                </NavItem>
            );
            tabs.push(nextTab);
        }
        return tabs;
    }

    getTabContent(tabContents) {
        var tabs = [];
        for (var ndx = 0; ndx < tabContents.length; ndx++) {
            var nextTab = (
                <TabPane tabId={ndx} key={ndx}>
                    {tabContents[ndx]}
                </TabPane>
            );
            tabs.push(nextTab);
        }
        return tabs;
    }

    render() {
        return (
            <div>
                <Nav tabs>
                    {this.getNavTabs(this.props.tabHeaders)}
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    {this.getTabContent(this.props.tabContents)}
                </TabContent>
            </div>
        );
    }
}

