import React from 'react';
import { Progress, Card, CardHeader, CardBlock } from 'reactstrap';

export default class ProgressBars extends React.Component {

  render() {
    return (
      <Card>
        <CardHeader>{this.props.headerText}</CardHeader>
        <CardBlock>
          {this.props.bars}
        </CardBlock>
      </Card>
    );
  }
};