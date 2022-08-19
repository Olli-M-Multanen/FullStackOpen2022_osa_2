import React from 'react'


const List = ({ query, handleDelete }) => {
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

export default List