const storage = window.localStorage

const renderContacts = () => {
  
  
  const contacts = JSON.parse(storage.getItem('contacts'))

  let div = document.querySelector('.contact-list')

  if (contacts) {
    div.innerHTML = ''

    const ul = document.createElement('div')

    contacts.forEach(contact => {
      let li = document.createElement('div')
      li.innerHTML = `
      
      <div class="ui card" id="card-div">
        <div class="image">
          <img src="https://semantic-ui.com/images/avatar/large/daniel.jpg">
        </div>
        <div class="content">
          <a class="header">${ contact.name }</a>
          
          <div class="description">
          <div class="ui list">
            <div> ${ contact.company }
            </div>
            <div class="item">
              <i class="mail icon"></i>
              <div class="content">
              ${ contact.email }
              </div>
            </div>
            <div class="item">
              <i class="linkify icon"></i>
              <div class="content">
              <a href="https://www.twitter.com/${ contact.twitter}">@${contact.twitter}</a>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div class="extra content">
          <a>
            <i class="user icon"></i>
            <p>${ contact.notes }</p> 
          </a>
        </div>
        <button class="delete-contact ui black basic button " onClick="var c = JSON.parse(localStorage.getItem('contacts')); c.forEach((item, index, array) => item.id === ${contact.id} && array.splice(index, 1) ); localStorage.setItem('contacts', JSON.stringify(c)); window.location.reload()">
              <i class="icon user"></i>
              Delete Contact
        </button>
      </div>
     `
      ul.appendChild(li)
    })

    div.appendChild(ul) 
  } else { 
    div.innerHTML = '<p>You have no contacts in your address book</p>' 
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderContacts()
  
  const addContactForm = document.querySelector('.new-contact-form')

  
  addContactForm.addEventListener('submit', event => {
    
    event.preventDefault()

    const {
      name,
      email,
      phone,
      company,
      notes,
      twitter,
    } = addContactForm.elements

    const contact = {
      id: Date.now(),
      name: name.value,
      email: email.value,
      phone: phone.value,
      company: company.value,
      notes: notes.value,
      twitter: twitter.value,
    }

    console.log(`Saving the following contact: ${JSON.stringify(contact)}`)
    let contacts = JSON.parse(storage.getItem('contacts')) || []
    contacts.push(contact)
    storage.setItem('contacts', JSON.stringify(contacts))
    renderContacts()
    addContactForm.reset()
  })

  //const index = `#contact-${field}`
  // letfunction remove(id) {
    
  //   let contacts = localStorage.getItem('contacts') ? JSON.parse(storage.getItem('contacts')) : [];
  //   let index;
  //   for (let i=0; i < contacts.length; i++) {
  //     if (contacts[i].id === id) {
  //       index=i;
  //       break;
  //     }
  //   }
  //   if(index === undefined) return
  //   contacts.splice(index, 1);
  //   storage.setItem('contacts', JSON.stringify(contacts));
  // }
  // || []
  // contacts.splice(contact[index])
  // storage.removeItem('contacts', JSON.stringify(contacts))
  // renderContacts()
})