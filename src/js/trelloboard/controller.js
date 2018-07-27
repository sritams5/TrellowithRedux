import 'jquery';
import 'jquery-ui';

import boardsView from './view';
import store from '../state';

const sortable = require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/disable-selection');

function showBoardDetails(event) {
  store.dispatch({
    type: 'SHOW_BOARD_DETAIL',
    boardId: event.target.getAttribute('board-id'),
  });
}
function deleteBoard(event) {
  store.dispatch({
    type: 'DEL_BOARD',
    boardId: event.target.getAttribute('board-id'),
  });
}

function hideBoardEditForm(event) {
  boardsView.hideBoardEditForm(event.target.getAttribute('board-id'));
}

function updateBoardDetail(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    store.dispatch({
      type: 'UPDT_BOARD',
      name: event.target.value,
      boardId: event.target.getAttribute('board-id'),
    });
    return false;
  } if (event.keyCode === 27) {
    boardsView.hideBoardEditForm(event.target.getAttribute('board-id'));
  }
  return true;
}


function showBoardEdit(event) {
  boardsView.showBoardEditForm(event.target.getAttribute('board-id'));
}
function makeSortable() {
  console.log("sortable dispatch");
  $('#boardList').sortable({
    update() {
      console.log("sortable update");
      const newOrder = [];
      const lis = this.getElementsByClassName('board_class');
      for (let i = 0; i < lis.length; i += 1) {
        newOrder.push((lis[i].getAttribute('board-id')));
      }
      console.log('newOrder-'+newOrder);
      store.dispatch({
        type: 'RE_ORDER_BOARD',
        order: newOrder,
      });
    },
  });
}

$('#boardList').on('click', '.boardEditIcon', showBoardEdit);
$('#boardList').on('click', '.boardDeleteIcon', deleteBoard);
$('#boardList').on('keydown', 'input.form-control', updateBoardDetail);
$('#boardList').on('focusout', 'input.form-control', hideBoardEditForm);
$('#boardList').on('click', 'a', showBoardDetails);

store.subscribe(() => {
  const state = store.getState();
  if (state.selectedBoardId >= 0) {
    boardsView.hideBoards();
  } else {
    boardsView.showBoards(state.boards);
    console.log("sortable");
    makeSortable();
  }
});
