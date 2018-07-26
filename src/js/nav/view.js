class NavHeader {
  constructor() {
    this.parent = document.getElementById('trelloNavBar');

    this.trelloLogo = `<div class="col d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
<a class="navbar-brand" href="#" id="myTrelloLogo">My Trello</a>
</div>`;

    this.headerForm = '<div class="col d-flex justify-content-center justify-content-md-end"></div>';

    this.addBoardForm = `<form class="form-inline" id="createBoard">
<input class="form-control mr-2" type="create" placeholder="Board Name" aria-label="Board Name" id="createBoardInput">
<button class="btn my-2 my-sm-0" type="button" id="createBoardBtn">Create</button>
</form>`;

    this.addListForm = `<form class="form-inline" id="createList">
<input class="form-control mr-2" type="create" placeholder="List name" aria-label="List Name" id="createListInput">
<button class="btn my-2 my-sm-0" type="button" id="createListBtn">Create</button>
</form>`;
  }

  createBoardHeader(boardName) {
    const board = NavHeader.createDOMElement(this.boardHeader = `<div class="col justify-content-center mb-3 mb-md-0" id="boardHeaderLabel">
<h4 class="navbar-brand" id="boardHeaderName">${boardName}</h4>
</div>`);
    return board;
  }

  static createDOMElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
  }

  showNavForBoardList() {
    this.parent.innerHTML = '';
    this.parent.appendChild(NavHeader.createDOMElement(this.trelloLogo));
    const headerForm = NavHeader.createDOMElement(this.headerForm)
      .appendChild(NavHeader.createDOMElement(this.addBoardForm));
    this.parent.appendChild(headerForm);
  }

  showNavForBoardDetails(boardName) {
    this.parent.innerHTML = '';
    this.parent.appendChild(NavHeader.createDOMElement(this.trelloLogo));
    this.parent.appendChild(this.createBoardHeader(boardName));
    const headerForm = NavHeader.createDOMElement(this.headerForm)
      .appendChild(NavHeader.createDOMElement(this.addListForm));
    this.parent.appendChild(headerForm);
  }
}

const nav = new NavHeader();
// module.exports = nav
export default nav;
