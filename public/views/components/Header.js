import React, {Component, PropTypes} from 'react'
import {Nav, NavItem, Button} from 'react-bootstrap'

export default class Header extends Component{
    handleSelect(selectedKey) {
        alert('selected ' + selectedKey);
    }

    render(){
        return (
            <div>
                <div>Home</div>
                <Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect.bind(this)}>
                    <NavItem eventKey={1}>NavItem 1 けいしぉ</NavItem>
                    <NavItem eventKey={2}>NavItem 2 けいし</NavItem>
                    <NavItem eventKey={3}>NavItem 3 ぉいけ</NavItem>
                </Nav>
            </div>
        )
    }
}


