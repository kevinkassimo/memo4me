import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import ContactType from '../../../../constants/contact-types';

function getContent(p) {
  return p.metadata.address;
}

function DashBoardEntry(props) {
  const p = props.contact;
  const content = getContent(p);
  const enabled = p.enabled;
  const typeInfo = p.type;
  const handleToggle = () => props.handleToggle(content, !enabled);
  const handleRemove = () => props.handleRemove(content);

  return <div>
    <span className={"emailEntryText" + (!enabled ? " emailEntryDisabled" : "") } > { content }  </span>
    {/*<span className="emailEntryType"> { typeInfo } </span>*/}
    <span>
        <button className="contentBtn emailtoggle" onClick={handleToggle}> {enabled? "Disable" : "Enable"} </button>
    </span>
    <span>
        <button className="contentBtn emailtoggle remove" onClick={handleRemove}> Remove </button>
    </span>
  </div>;
}

export default class DashboardEmail extends Component {
  constructor(props) {
    super(props);
    // props: addContact, emails
    this.state = {value: '', type: ContactType.EMAIL};
  }

  handleAdd() {
    alert('About to add an entry of type ' + this.state.type);
    this.props.addContact(this.state.value, this.state.type);
    this.setState({value : ''});
  }

  handleToggle = (id, status) => {
    this.props.toggleContact(id, status);
  }

  handleRemove = (id) => {
    this.props.removeContact(id);
  }

  onChange = (e) => {
    this.setState({type: e.target.value});
  }

  onDropdownChange = (eventKey) => {
    this.setState({type: eventKey});
  }

  render() {
    const listItems =  this.props.contacts.map(
      (contact) => {
        const content = getContent(contact);
        return <li key={content}>  <DashBoardEntry contact={contact}
                                                  handleToggle={this.handleToggle}
                                                  handleRemove={this.handleRemove}
        /> </li>
      } );

    const ret =
      <div className="contentItem">
        <h3>Add Contact </h3>

        <ul>
          {listItems}
        </ul>
        {/*<DropdownButton bsStyle="default" title="Choose Type" id="select-contact-type">
          <MenuItem eventKey={ContactType.EMAIL} onSelect={this.onDropdownChange} active>Email</MenuItem>
          <MenuItem eventKey={ContactType.TEXT} onSelect={this.onDropdownChange}>Text</MenuItem>
        </DropdownButton>*/}

        <input className="contact-input" type="text" name="text" value={this.state.value}
               onChange={ (e) => this.setState({value: e.target.value})} />

        <div className="select-style">
          <select onChange={this.onChange}> 
            <option value={ContactType.EMAIL}>Email</option>
            <option value={ContactType.TEXT}> Text</option>
          </select>
        </div>

        <div className="clear">
        <button className="contentBtn submitBtn" onClick={this.handleAdd.bind(this)}> Add </button>
        </div>
      </div>;
    return ret;
  }
}
