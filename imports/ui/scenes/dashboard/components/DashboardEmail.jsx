import React, { Component } from 'react';

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
    <span className={"emailEntryText" + !enabled ? " emailEntryDisabled" : ""} > { content }  </span>
    <span className="emailEntryType"> { typeInfo } </span>
    <span>
            <button onClick={handleToggle}> {enabled? "Disable" : "Enable"} </button>
        </span>
    <span>
            <button onClick={handleRemove}> Remove </button>
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

  render() {
    const listItems =  this.props.contacts.map(
      (contact) => {
        const content = getContent(contact);
        return <li key={content}> <DashBoardEntry contact={contact}
                                                  handleToggle={this.handleToggle}
                                                  handleRemove={this.handleRemove}
        /> </li>
      } );

    const ret =
      <div>
        <h3>Add Contact </h3>

        <ul>
          {listItems}
        </ul>

        <input type="text" name="text" value={this.state.value}
               onChange={ (e) => this.setState({value: e.target.value})} />

        <select onChange={this.onChange}> 
          <option value={ContactType.EMAIL}>Email</option>
          <option value={ContactType.TEXT}> Text</option>
        </select>

        <button onClick={this.handleAdd.bind(this)}> Add Contact </button>
      </div>;
    return ret;
  }
}
