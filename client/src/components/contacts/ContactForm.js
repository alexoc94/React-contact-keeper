import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, clearCurrent, current } = contactContext;

  useEffect(() => {
    if (current !== null) {//if current!= null then were updating a contact not adding one.
      setContact(current);
    } else {
      setContact({//resetting the form fields to original and form has been submitted
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]);/*here is our dependencies. we only want this to happen if the contactcontext or the current
   value is changes*/

  const [contact, setContact] = useState({//using usestate as were changing the state?
    name: '',
    email: '',
    phone: '',//phone will = the value of phone.
    type: 'personal'
  });

  const { name, email, phone, type } = contact;

  const onChange = e => setContact(//we use setContact because were changing the setContact part of the component level state
    { ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      //instead of context.addcontact just destructure addContact from context.
      addContact(contact);//adds the fields of the form(contact) to the method.
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone} //value always ={name of field in state}. Whatever is typed in 'phone' become the value
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
