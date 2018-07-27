import 'jquery';
import 'jquery-ui';

import boardsView from './view';
import store from '../state';

require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/disable-selection');


function showBoardDetails(event) {
  store.dispatch({
    type: 'BOARDDETAIL',
    boardId: event.target.getAttribute('mytrelloboardId'),
  });
}
$('#boardList').on('click', 'a', showBoardDetails);

function showBoardEdit(event) {
  boardsView.showBoardEditForm(event.target.getAttribute('mytrelloboardId'));
}
$('#boardList').on('click', '.boardEditIcon', showBoardEdit);

function deleteBoard(event) {
  store.dispatch({
    type: 'DELETEBOARD',
    boardId: event.target.getAttribute('mytrelloboardId'),
  });
}
$('#boardList').on('click', '.boardDeleteIcon', deleteBoard);

function updateBoardDetail(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    store.dispatch({
      type: 'UPDATEBOARD',
      name: event.target.value,
      boardId: event.target.getAttribute('mytrelloboardId'),
    });
    return false;
  } if (event.keyCode === 27) {
    boardsView.hideBoardEditForm(event.target.getAttribute('mytrelloboardId'));
  }
  return true;
}
$('#boardList').on('keydown', 'input.form-control', updateBoardDetail);

function hideBoardEditForm(event) {
  boardsView.hideBoardEditForm(event.target.getAttribute('mytrelloboardId'));
}
$('#boardList').on('focusout', 'input.form-control', hideBoardEditForm);


function doSwappable() {
  $('#boardList').sortable({
    update() {
      const position = [];
      const lis = this.getElementsByClassName('board_class');
      for (let i = 0; i < lis.length; i += 1) {
        position.push((lis[i].getAttribute('mytrelloboardId')));
      }
      store.dispatch({
        type: 'REPOSITIONBOARD',
        position,
      });
    },
  });
}


store.subscribe(() => {
  const state = store.getState();
  if (state.ibdSelected >= 0) {
    boardsView.hideBoards();
  } else {
    boardsView.showBoards(state.boards);
    doSwappable();
  }
});
