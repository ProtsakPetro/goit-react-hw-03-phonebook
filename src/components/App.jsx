import { Component } from 'react';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import { Container } from './index.styled';
import Filter from './Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      this.setState({ contacts: JSON.parse(localData) });
    }
  }

  componentDidUpdate(_, prevState) {
    console.log('prevState', prevState);
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentWillUnmount() {
    localStorage.removeItem('contacts');
  }

  addContactData = newContact => {
    const isTrue = this.state.contacts.some(
      ({ name }) => name === newContact.name
    );
    if (isTrue) {
      Notify.failure(`${newContact.name} it's already in the contacts`);
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  removeContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  getFilterData = ({ target: { value } }) => {
    this.setState({
      filter: value,
    });
  };

  render() {
    const filterContacts = this.getFilterContacts();
    return (
      <Container>
        <h1>PHONEBOOK</h1>
        <ContactForm addContactData={this.addContactData} />
        <h2>CONTACTS</h2>
        <Filter filter={this.state.filter} getFilterData={this.getFilterData} />
        <ContactList
          contacts={filterContacts}
          removeContact={this.removeContact}
          getFilterContacts={this.getFilterContacts}
        />
      </Container>
    );
  }
}

export default App;