import React from 'react';
import TableSheet from './TableSheet.jsx';

//a generic table to show just a brief description of the items to be clicked and
//have their info be displayed on a larger section elsewhere on screen.
//The "headerText" prop doesnt need to be text,
//The "footer" is required for TableSheet
export default class ItemTable extends React.Component {
    constructor(props) {
        super(props);

        this.RowProps = this.RowProps.bind(this);
        this.clickedFunction = this.clickedFunction.bind(this);

        this.state = {            
            rowID: 0,
            selected: null
        };
        //this.displayChoice(this.props.displayType);
    }

    //Process the rows that are passed in to fill in the Table
    processRows(rowData) {
        for (var i = 0; i < rowData.length; i++) {
            number: { rowData[i].number };
            desc: { rowData[i].desc };
            type: { rowData[i].type };
            index: { i };
        };
        return rowData;
    }

    //this allows for selection and still renders the background colors
    RowProps(state, rowInfo) {
        if (rowInfo) {                                  //if the row is not undefined
            var backgroundColor;                        //create backgroundColor variable
            if (rowInfo.index % 2 === 0) {              //start with the grayish color
                backgroundColor = "whitesmoke";
            } else {                                    //otherwise its white
                backgroundColor = "white";
            }

            //if it has a isRented that returns true it will show red background
            //a little unclear on why its .original but thats what got it to work
            if (!rowInfo.original.is_available) {
                backgroundColor = "lightcoral";
            }

            return {
                onClick: (e) => {
                    this.clickedFunction(rowInfo)
                },
                style: {
                    background: rowInfo.index === this.state.selected ? '#00afec' : backgroundColor,
                    color: rowInfo.index === this.state.selected ? 'white' : 'black'
                }
            }
        } else {
            return {};
        }

    }

    clickedFunction(rowInfo) {
        if (rowInfo) {
            //for the color change
            this.setState({
                selected: rowInfo.index
            })

            //calls prop function itemSelected passing it rowInfo's index so
            //the table knows which row its looking at
            this.props.itemSelected(rowInfo.index);
        }
    }


    //filter stuff is for testing the states
    render() {
        return (
                        <TableSheet
                            getTrProps={this.RowProps}
                            headerText={this.props.top}
                            columns={this.props.columns}
                            footer={this.props.bottom}>
                            {this.processRows(this.props.rows)}
                        </TableSheet>
        );
    }
}