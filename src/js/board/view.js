class Boards {
  constructor() {
    this.parent = document.getElementById('boardList');
  }

  static createDOMElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
  }

  static createBoardOdd(boardName, boardId) {
    return Boards.createDOMElement(`<div class="card m_boardsBox_odd" board-id="${boardId}">
    <div class="d-flex justify-content-end mt-1 mr-1 m_boardCardHeader">
    <button class="m_boardIcon boardEditIcon" board-id="${boardId}">
    <img class="m_icon" alt="Edit Overview" src="img/edit.png" board-id="${boardId}">
    </button>
    <button class="m_boardIcon boardDeleteIcon" board-id="${boardId}">
    <img class="m_icon" alt="Delete Overview" src="img/delete.png" board-id="${boardId}">
    </button>
    </div>
    <div class="card-body pt-1" board-id="${boardId}">
    <a href="#" board-id="${boardId}">
    <h5 class="card-title centered" board-id="${boardId}">${boardName}</h5>
    </a>
    <form class="form-inline d-none"><input class="form-control w-100" board-id="${boardId}" value="${boardName}"></form>
    </div>
    </div>`);
  }
  static createBoardEven(boardName, boardId) {
    return Boards.createDOMElement(`<div class="card m_boardsBox_even" board-id="${boardId}">
    <div class="d-flex justify-content-end mt-1 mr-1 m_boardCardHeader">
    <button class="m_boardIcon boardEditIcon" board-id="${boardId}">
    <img class="m_icon" alt="Edit Overview" src="img/edit.png" board-id="${boardId}">
    </button>
    <button class="m_boardIcon boardDeleteIcon" board-id="${boardId}">
    <img class="m_icon" alt="Delete Overview" src="img/delete.png" board-id="${boardId}">
    </button>
    </div>
    <div class="card-body pt-1" board-id="${boardId}">
    <a href="#" board-id="${boardId}">
    <h5 class="card-title centered" board-id="${boardId}">${boardName}</h5>
    </a>
    <form class="form-inline d-none"><input class="form-control w-100" board-id="${boardId}" value="${boardName}"></form>
    </div>
    </div>`);
  }
  showBoards(boards) {
    this.parent.innerHTML = '';
    boards.forEach((board, index) => {
      if(isOdd(parseInt(index)+2)){
        this.parent.appendChild(Boards.createBoardOdd(board.name, index));
      }else{
        this.parent.appendChild(Boards.createBoardEven(board.name, index));
      }
    });
    this.parent.className = 'container d-flex flex-wrap flex-column flex-md-row';
  }

  hideBoards() {
    this.parent.className = 'container flex-wrap flex-column flex-md-row d-none';
  }

  showBoardEditForm(boardId) {
    const a = this.parent.querySelector(`div[board-id="${boardId}"].card-body a`);
    a.classList.add('d-none');
    const form = this.parent.querySelector(`div[board-id="${boardId}"].card-body form`);
    form.classList.remove('d-none');
    const formInput = this.parent.querySelector(`div[board-id="${boardId}"].card-body input`);
    formInput.focus();
  }

  hideBoardEditForm(boardId) {
    const a = this.parent.querySelector(`div[board-id="${boardId}"].card-body a`);
    a.classList.remove('d-none');
    const form = this.parent.querySelector(`div[board-id="${boardId}"].card-body form`);
    form.classList.add('d-none');
  }
}
function isOdd(num) { return num % 2;}
const boardsView = new Boards();

export default boardsView;
