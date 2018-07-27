import nav from './view';
import store from '../state';


function showBoardList() {
  store.dispatch({ type: 'SHOWBOARDS' });
}
$('#navabarId').on('click', '#brandid', showBoardList);
function createBoard() {
  const boardInput = document.getElementById('boardInputId');
  $('#boardModal').modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
  if (boardInput.value) {
    store.dispatch({ type: 'CREATEBOARD', name: boardInput.value });
  }
}
$('#navabarId').on('click', '#boardBtnId', createBoard);
function createBoardFromInput(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    createBoard();
    return false;
  }
  return true;
}
$('#navabarId').on('keydown', '#boardInputId', createBoardFromInput);
function createList() {
  const listInput = document.getElementById('listInputId');
  $('#listModal').modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
  if (listInput.value) {
    store.dispatch({ type: 'CREATELIST', name: listInput.value });
  }
}
$('#navabarId').on('click', '#listBtnId', createList);
function createListFromInput(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    createList();
    return false;
  }
  return true;
}
$('#navabarId').on('keydown', '#listInputId', createListFromInput);

nav.showNavForBoardList();

store.subscribe(() => {
  const state = store.getState();
  if (state.ibdSelected >= 0) {
    nav.showNavForBoardDetails(state.boards[state.ibdSelected].name);
  } else {
    nav.showNavForBoardList();
  }
});
