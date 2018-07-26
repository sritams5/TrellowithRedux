import $ from 'jquery';
import store from './state';

function loadBoards() {
  $.ajax('http://localhost:3000/boards/1',
    {
      dataType: 'json', // type of response data
      timeout: 500, // timeout milliseconds
      success(data) { // success callback function
        // console.log('got response from ajax');
        // console.log(data);
        const boards = JSON.parse(data.data);
        // console.log(boards);
        store.dispatch({
          type: 'LOAD_DATA',
          data: boards,
        });
      },
      error(jqXhr) { // error callback
        if (jqXhr.status === 404) {
          store.dispatch({
            type: 'LOAD_DATA',
            data: [],
          });
        }
      },
    });
}

function saveBoardsData(boards) {
  $.ajax('http://localhost:3000/boards/', {
    type: 'POST', // http method
    async: false,
    data: { data: JSON.stringify(boards) }, // data to submit
  });
}
function saveBoards(boards) {
  $.ajax('http://localhost:3000/boards/1', {
    type: 'DELETE', // http method
    async: false,
    data: JSON.stringify(boards), // data to submit
    success() {
      // console.log('Data deleted : ');
      // console.log(data);
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
