import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

const Home = () => {
  return (
    //two evenly split columns
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        {/* Below prints out the output of map in component "Contacts" */}
        <Contacts /> 
      </div>
    </div>
  );
};

export default Home;
