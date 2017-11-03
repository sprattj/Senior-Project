import React from 'react';
import { Card, CardHeader, CardBlock, CardFooter, ListGroup} from 'reactstrap';


export default class LoftList extends React.Component {

    render() {

        return (
            <Card>
                <CardHeader>{this.props.headerText}</CardHeader>
                <CardBlock>
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