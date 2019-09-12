const storage = window.localStorage

const renderContacts = () => {
  
  
  const contacts = JSON.parse(storage.getItem('contacts'))

  let div = document.querySelector('.contact-list')

  if (contacts) {
    div.innerHTML = ''

    const ul = document.createElement('ul')

    contacts.forEach(contact => {
      let li = document.createElement('li')
      li.innerHTML = `
      <div class="ui column">
      <div class="ui card">
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
      </div>
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
})