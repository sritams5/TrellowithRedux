class NavHeader {
  constructor() {
    this.parent = document.getElementById('trelloNavBar');

    this.trelloLogo = `<div class="col d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
    <a class="navbar-brand" href="#" id="myTrelloLogo"><img src="img/logo.png" alt="logo" id="brand" class="img-responsive"></a>
    </div>`;

    this.headerForm = '<div class="col d-flex justify-content-center justify-content-md-end"></div>';
    this.addBoardForm = `<form class="form-inline" id="createBoard">
    <button class="btn btn-primary my-2 my-sm-0" type="button" data-toggle="modal" data-target="#boardModal">+ Add Board</button>
    </form>`;
    this.modalBoardForm = `<div class="modal fade" id="boardModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    </div>
    <div class="modal-body">
    <form>
    <div class="form-group">
    <input type="text" class="form-control" id="createBoardInput" placeholder="Add board title" name="boardname"></input>
    </div>
    <button type="button" id="createBoardBtn" class="btn btn-success">Submit</button>
    </form>
    </div>
    </div>
    </div>
    </div>`;
    this.addListForm = `<form class="form-inline" id="createList">
    <button class="btn btn-primary my-2 my-sm-0" type="button" data-toggle="modal" data-target="#listModal">+ Add List</button>
    </form>`;
    this.modalListForm = `<div class="modal fade" id="listModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    </div>
    <div class="modal-body">
    <form>
    <div class="form-group">
    <input type="text" class="form-control" id="createListInput" placeholder="Add list title" name="boardname"></input>
    </div>
    <button type="button" id="createListBtn" class="btn btn-success">Submit</button>
    </form>
    </div>
    </div>
    </div>
    </div>`;
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
    this.parent.appendChild(NavHeader.createDOMElement(this.modalBoardForm));
    this.parent.appendChild(headerForm);
  }

  showNavForBoardDetails(boardName) {
    this.parent.innerHTML = '';
    this.parent.appendChild(NavHeader.createDOMElement(this.trelloLogo));
    this.parent.appendChild(this.createBoardHeader(boardName));
    const headerForm = NavHeader.createDOMElement(this.headerForm)
    .appendChild(NavHeader.createDOMElement(this.addListForm));
    this.parent.appendChild(NavHeader.createDOMElement(this.modalListForm));
    this.parent.appendChild(headerForm);
  }
}

const nav = new NavHeader();
// module.exports = nav
export default nav;
