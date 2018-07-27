import $ from 'jquery';
import store from './state';

function loadBoards() {
  $.ajax('http://localhost:3000/boards/1',
    {
      dataType: 'json',
      timeout: 500,
      success(data) {
        const boards = JSON.parse(data.data);
        store.dispatch({
          type: 'LOADDATA',
          data: boards,
        });
      },
      error(jqXhr) {
        if (jqXhr.status === 404) {
          store.dispatch({
            type: 'LOADDATA',
            data: [],
          });
        }
      },
    });
}

function saveBoardsData(boards) {
  $.ajax('http://localhost:3000/boards/', {
    type: 'POST',
    async: false,
    data: { data: JSON.stringify(boards) },
  });
}
function saveBoards(boards) {
  $.ajax('http://localhost:3000/boards/1', {
    type: 'DELETE',
    async: false,
    data: JSON.stringify(boards),
    success() {
      saveBoardsData(boards);
    },
    error(jqXhr) {
      if (jqXhr.status === 404) {
        saveBoardsData();
      }
    },
  });
}
function saveData() {
  const state = store.getState();
  saveBoards(state.boards);
}
store.subscribe(saveData);
loadBoards();
export { loadBoards, saveBoards };
