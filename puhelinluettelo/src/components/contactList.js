import React from 'react'


const ContactList = ({ query, handleDelete }) => {
    return (
      <>
      {query.map((contact) => {
          return (
            <div key={contact.id}>
              <p>{contact.name} {contact.number}
              <button onClick={() => handleDelete(contact)}>Delete</button>
              </p>
              </div>
          )
        })}
      </>
    )
  }

export default ContactList