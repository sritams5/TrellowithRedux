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
    return ListBox.createDOMElement(`<div class="card m_listBox" boardlistId="${listId}">
<div class="card-header d-flex justify-content-between" boardlistId="${listId}">
<h5>${listName}</h5>
<form class="form-inline d-none" boardlistId="${listId}">
<input class="form-control listInput w-100" boardlistId="${listId}" value="${listName}">
</form>
<span class="m_card_icon_span">
<button class="m_listIcon listEditIcon" boardlistId="${listId}">
<img class="m_smallicon" alt="Edit ${listName}" src="img/edit.png" boardlistId="${listId}">
</button>
<button class="m_listIcon listDeleteIcon" boardlistId="${listId}">
<img class="m_smallicon" src="img/delete.png" alt="Delete ${listName}" boardlistId="${listId}">
</button>
</span>
</div>
<div class="card-body px-0 py-0 m_card_list">
<ul boardlistId="${listId}" class="list-group m_card_list list-group-flush ui-sortable" style="min-height: 60px;">
</ul>
</div>
<div class="card-footer" boardlistId="${listId}">
<a href="#" boardlistId="${listId}">Add a Card</a>
<form class="form-inline d-none" boardlistId="${listId}">
<input class="form-control newCard w-100" boardlistId="${listId}">
</form>
</div>
</div>`);
  }

  static createCard(cardName, cardId, listId) {
    return ListBox.createDOMElement(`<li class="d-flex flex-row card-detail justify-content-between m_card rounded" cardViewId="${cardId}" boardlistId="${listId}">
<p class="mb-0">${cardName}</p>
<form class="form-inline d-none">
<input class="form-control cardInput w-100" cardViewId="${cardId}" boardlistId="${listId}" value="${cardName}">
</form>
<span class="m_card_icon_span">
<button class="m_listIcon cardEditIcon" cardViewId="${cardId}" boardlistId="${listId}">
<img class="m_smallicon" alt="Edit ${cardName}" src="img/edit.png" cardViewId="${cardId}" boardlistId="${listId}">
</button>
<button class="m_listIcon cardDeleteIcon" cardViewId="${cardId}" boardlistId="${listId}">
<img class="m_smallicon" src="img/delete.png" alt="Delete ${cardName}" cardViewId="${cardId}" boardlistId="${listId}">
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
    const a = this.parent.querySelector(`div[boardlistId="${listId}"].card-header h5`);
    a.classList.add('d-none');
    const form = this.parent.querySelector(`div[boardlistId="${listId}"].card-header form`);
    form.classList.remove('d-none');
    const formInput = this.parent.querySelector(`div[boardlistId="${listId}"].card-header input`);
    formInput.focus();
  }

  hideListEditForm(listId) {
    const a = this.parent.querySelector(`div[boardlistId="${listId}"].card-header h5`);
    a.classList.remove('d-none');
    const form = this.parent.querySelector(`div[boardlistId="${listId}"].card-header form`);
    form.classList.add('d-none');
  }

  showAddCards(listId) {
    const a = this.parent.querySelector(`div[boardlistId="${listId}"].card-footer a`);
    a.classList.add('d-none');
    const form = this.parent.querySelector(`div[boardlistId="${listId}"].card-footer form`);
    form.classList.remove('d-none');
    const formInput = this.parent.querySelector(`div[boardlistId="${listId}"].card-footer input`);
    formInput.value = '';
    formInput.focus();
  }

  hideAddCards(listId) {
    // console.log('In list view hideAddCards');
    const a = this.parent.querySelector(`div[boardlistId="${listId}"].card-footer a`);
    a.classList.remove('d-none');
    const form = this.parent.querySelector(`div[boardlistId="${listId}"].card-footer form`);
    form.classList.add('d-none');
  }

  showEditCard(listId, cardId) {
    // console.log('In list view showEditCards');
    const a = this.parent.querySelector(`li[boardlistId="${listId}"][cardViewId="${cardId}"].card-detail p`);
    a.classList.add('d-none');
    const form = this.parent.querySelector(`li[boardlistId="${listId}"][cardViewId="${cardId}"].card-detail form`);
    form.classList.remove('d-none');
    const formInput = this.parent.querySelector(`li[boardlistId="${listId}"][cardViewId="${cardId}"].card-detail input`);
    formInput.focus();
  }

  hideEditCard(listId, cardId) {
    const a = this.parent.querySelector(`li[boardlistId="${listId}"][cardViewId="${cardId}"].card-detail p`);
    a.classList.remove('d-none');
    const form = this.parent.querySelector(`li[boardlistId="${listId}"][cardViewId="${cardId}"].card-detail form`);
    form.classList.add('d-none');
  }
}

const listBox = new ListBox();

export default listBox;
