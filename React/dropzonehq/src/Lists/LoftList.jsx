import React from 'react';
import { Card, CardHeader, CardBlock, CardFooter, ListGroup} from 'reactstrap';
import './LoftList.css';


export default class LoftList extends React.Component {

    render() {

        return (
            <Card>
                <CardHeader>{this.props.headerText}</CardHeader>
                <CardBlock  className="loft_list">
                    <ListGroup>
                        {this.props.children}
                    </ListGroup>
                </CardBlock>
                <CardFooter>
                    {this.props.footerContent}
                </CardFooter>
            </Card>
        );
    }
}