import nav from './view';
import store from '../state';

function showBoardList() {
  store.dispatch({ type: 'SHOW_BOARDS' });
}

function createBoard() {
  const createBoardInput = document.getElementById('createBoardInput');
  $('#boardModal').modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
  if (createBoardInput.value) {
    store.dispatch({ type: 'ADD_BOARD', name: createBoardInput.value });
  }
}

function createBoardKey(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    createBoard();
    return false;
  }
  return true;
}

function createList() {
  const createListInput = document.getElementById('createListInput');
  $('#listModal').modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
  if (createListInput.value) {
    store.dispatch({ type: 'ADD_LIST', name: createListInput.value });
  }
}

function createListKey(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    createList();
    return false;
  }
  return true;
}


nav.showNavForBoardList();

$('#trelloNavBar').on('click', '#createBoardBtn', createBoard);
$('#trelloNavBar').on('keydown', '#createBoardInput', createBoardKey);
$('#trelloNavBar').on('click', '#createListBtn', createList);
$('#trelloNavBar').on('keydown', '#createListInput', createListKey);
$('#trelloNavBar').on('click', '#myTrelloLogo', showBoardList);

store.subscribe(() => {
  const state = store.getState();
  if (state.selectedBoardId >= 0) {
    nav.showNavForBoardDetails(state.boards[state.selectedBoardId].name);
  } else {
    nav.showNavForBoardList();
  }
});
