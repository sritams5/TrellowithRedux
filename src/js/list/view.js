class ListBox {
  constructor() {
    this.parent = document.getElementById('boardDetails');
  }

  static createDOMElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
  }

  static creatList(listName, listId) {
    return ListBox.createDOMElement(`<div class="card m_listBox" list-id="${listId}">
<div class="card-header d-flex justify-content-between" list-id="${listId}">
<h5>${listName}</h5>
<form class="form-inline d-none" list-id="${listId}">
<input class="form-control listInput w-100" list-id="${listId}" value="${listName}">
</form>
<span class="m_card_icon_span">
<button class="m_listIcon listEditIcon" list-id="${listId}">
<img class="m_smallicon" alt="Edit ${listName}" src="img/edit.png" list-id="${listId}">
</button>
<button class="m_listIcon listDeleteIcon" list-id="${listId}">
<img class="m_smallicon" src="img/delete.png" alt="Delete ${listName}" list-id="${listId}">
</button>
</span>
</div>
<div class="card-body px-0 py-0 m_card_list">
<ul list-id="${listId}" class="list-group m_card_list list-group-flush ui-sortable" style="min-height: 60px;">
</ul>
</div>
<div class="card-footer" list-id="${listId}">
<a href="#" list-id="${listId}">Add a Card</a>
<form class="form-inline d-none" list-id="${listId}">
<input class="form-control newCard w-100" list-id="${listId}">
</form>
</div>
</div>`);
  }

  static createCard(cardName, cardId, listId) {
    return ListBox.createDOMElement(`<li class="d-flex flex-row card-detail justify-content-between m_card rounded" card-id="${cardId}" list-id="${listId}">
<p class="mb-0">${cardName}</p>
<form class="form-inline d-none">
<input class="form-control cardInput w-100" card-id="${cardId}" list-id="${listId}" value="${cardName}">
</form>
<span class="m_card_icon_span">
<button class="m_listIcon cardEditIcon" card-id="${cardId}" list-id="${listId}">
<img class="m_smallicon" alt="Edit ${cardName}" src="img/edit.png" card-id="${cardId}" list-id="${listId}">
</button>
<button class="m_listIcon cardDeleteIcon" card-id="${cardId}" list-id="${listId}">
<img class="m_smallicon" src="img/delete.png" alt="Delete ${cardName}" card-id="${cardId}" list-id="${listId}">
</button>
</span>
</li>`);
  }


  showLists(lists) {
    this.parent.className = 'd-flex flex-column flex-md-row';
    this.parent.innerHTML = '';

    lists.forEach((listItem, listIndex) => {
      const listDom = ListBox.creatList(listItem.name, listIndex);
      this.parent.appendChild(listDom);

      listItem.cards.forEach((cardItem, cardIndex) => {
        const cardDom = ListBox.createCard(cardItem.name, cardIndex, listIndex);
        listDom.getElementsByTagName('ul')[0].appendChild(cardDom);
      });
    });
  }

  hideLists() {
    this.parent.className = 'd-none';
  }

  showListEditForm(listId) {
    const a = this.parent.querySelector(`div[list-id="${listId}"].card-header h5`);
    a.classList.add('d-none');
    const form = this.parent.querySelector(`div[list-id="${listId}"].card-header form`);
    form.classList.remove('d-none');
    const formInput = this.parent.querySelector(`div[list-id="${listId}"].card-header input`);
    formInput.focus();
    // console.log(a);
    // console.log(form);
  }

  hideListEditForm(listId) {
    const a = this.parent.querySelector(`div[list-id="${listId}"].card-header h5`);
    a.classList.remove('d-none');
    const form = this.parent.querySelector(`div[list-id="${listId}"].card-header form`);
    form.classList.add('d-none');
  }

  showAddCards(listId) {
    // console.log('In list view showAddCards');
    const a = this.parent.querySelector(`div[list-id="${listId}"].card-footer a`);
    a.classList.add('d-none');
    const form = this.parent.querySelector(`div[list-id="${listId}"].card-footer form`);
    form.classList.remove('d-none');
    const formInput = this.parent.querySelector(`div[list-id="${listId}"].card-footer input`);
    formInput.value = '';
    formInput.focus();
  }

  hideAddCards(listId) {
    // console.log('In list view hideAddCards');
    const a = this.parent.querySelector(`div[list-id="${listId}"].card-footer a`);
    a.classList.remove('d-none');
    const form = this.parent.querySelector(`div[list-id="${listId}"].card-footer form`);
    form.classList.add('d-none');
  }

  showEditCard(listId, cardId) {
    // console.log('In list view showEditCards');
    const a = this.parent.querySelector(`li[list-id="${listId}"][card-id="${cardId}"].card-detail p`);
    a.classList.add('d-none');
    const form = this.parent.querySelector(`li[list-id="${listId}"][card-id="${cardId}"].card-detail form`);
    form.classList.remove('d-none');
    const formInput = this.parent.querySelector(`li[list-id="${listId}"][card-id="${cardId}"].card-detail input`);
    formInput.focus();
    // console.log(a);
    // console.log(form);
  }

  hideEditCard(listId, cardId) {
    // console.log('In list view hideEditCard');
    const a = this.parent.querySelector(`li[list-id="${listId}"][card-id="${cardId}"].card-detail p`);
    a.classList.remove('d-none');
    const form = this.parent.querySelector(`li[list-id="${listId}"][card-id="${cardId}"].card-detail form`);
    form.classList.add('d-none');
  }
}

const listBox = new ListBox();

export default listBox;
