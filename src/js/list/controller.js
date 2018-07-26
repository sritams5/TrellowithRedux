import 'jquery';
import 'jquery-ui';

import listBox from './view';
import store from '../state';

const sortable = require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/disable-selection');

function showEditCard(event) {
  // console.log('In showEditCard');
  // console.log(event);
  const listId = event.target.getAttribute('list-id');
  const cardId = event.target.getAttribute('card-id');
  listBox.showEditCard(listId, cardId);
}

function hideEditCard(event) {
  // console.log('In hideEditCard');
  // console.log(event);
  const listId = event.target.getAttribute('list-id');
  const cardId = event.target.getAttribute('card-id');
  listBox.hideEditCard(listId, cardId);
}
function updateCard(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    // console.log('in controller updateCard enter');
    const listId = event.target.getAttribute('list-id');
    const cardId = event.target.getAttribute('card-id');
    store.dispatch({
      type: 'UPDT_CARD',
      name: event.target.value,
      listId,
      cardId,
    });
    return false;
  } if (event.keyCode === 27) {
    const listId = event.target.getAttribute('list-id');
    const cardId = event.target.getAttribute('card-id');
    listBox.hideEditCard(listId, cardId);
  }
  return true;
}
function deleteCard(event) {
  // console.log('In delete card');
  // console.log(event);
  const listId = event.target.getAttribute('list-id');
  const cardId = event.target.getAttribute('card-id');
  store.dispatch({
    type: 'DEL_CARD',
    listId,
    cardId,
  });
}
function addNewCard(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    // console.log('in controller addNewCard enter');
    store.dispatch({
      type: 'ADD_CARD',
      name: event.target.value,
      listId: event.target.getAttribute('list-id'),
    });
    return false;
  } if (event.keyCode === 27) {
    // console.log('in controller addNewCard escape');
    listBox.hideAddCards(event.target.getAttribute('list-id'));
  }
  return true;
}
function showAddCards(event) {
  listBox.showAddCards(event.target.getAttribute('list-id'));
}

function hideAddCards(event) {
  listBox.hideAddCards(event.target.getAttribute('list-id'));
}

function updateListDetails(event) {
  // console.log(event.target.value);
  if (event.keyCode === 13) {
    // console.log('in controller updateListDetails enter');
    event.preventDefault();
    store.dispatch({
      type: 'UPDT_LIST',
      name: event.target.value,
      listId: event.target.getAttribute('list-id'),
    });
    return false;
  } if (event.keyCode === 27) {
    // console.log('in controller updateListDetails escape');
    listBox.hideListEditForm(event.target.getAttribute('list-id'));
  }

  return true;
}
function hideListEdit(event) {
  // console.log('in controller hideListEdit');
  listBox.hideListEditForm(event.target.getAttribute('list-id'));
}
function showListEdit(event) {
  // console.log('controller - showListEdit');
  // console.log(event);
  listBox.showListEditForm(event.target.getAttribute('list-id'));
}
function deleteList(event) {
  // console.log('controller - deleteList(event)');
  // console.log(event);
  store.dispatch({
    type: 'DEL_LIST',
    listId: event.target.getAttribute('list-id'),
  });
}
function makeSortable() {
  $('#boardDetails').sortable({
    handle: '.card-header',
    update() {
      // console.log('boardDetails list update event');
      // console.log(event);
      // console.log(this);
      const newOrder = [];
      const lis = this.getElementsByClassName('m_listBox');
      for (let i = 0; i < lis.length; i += 1) {
        // console.log(lis[i]);
        newOrder.push((lis[i].getAttribute('list-id')));
      }

      // console.log(newOrder);

      store.dispatch({
        type: 'RE_ORDER_LIST',
        order: newOrder,
      });
    },
  });
  $('.m_card_list').sortable({
    connectWith: 'ul',
    update() {
      // console.log('card ul body list update event');
      // console.log(event);
      // console.log(this);

      const tempListId = this.getAttribute('list-id');

      const tempCardList = [];

      const lis = this.getElementsByTagName('li');
      // console.log(lis);
      for (let i = 0; i < lis.length; i += 1) {
        const tp = lis[i].getElementsByTagName('p');
        tempCardList.push(tp[0].innerText);
      }

      store.dispatch({
        type: 'RESET_LIST',
        cards: tempCardList,
        listId: tempListId,
      });
    },
  });
}
function render() {
  // console.log('In List controller');
  const state = store.getState();
  // console.log(state);
  if (state.selectedBoardId >= 0) {
    const listItems = state.boards[state.selectedBoardId].lists;
    listBox.showLists(listItems);
    makeSortable();
    if (state.selectedListId) {
      listBox.showAddCards(state.selectedListId);
    }
  } else {
    listBox.hideLists();
  }
}

$('#boardDetails').on('click', '.listEditIcon', showListEdit);
$('#boardDetails').on('click', '.listDeleteIcon', deleteList);
$('#boardDetails').on('keydown', 'input.listInput', updateListDetails);
$('#boardDetails').on('focusout', 'input.listInput', hideListEdit);

$('#boardDetails').on('click', 'div.card-footer a', showAddCards);
$('#boardDetails').on('focusout', 'input.newCard', hideAddCards);
$('#boardDetails').on('keydown', 'input.newCard', addNewCard);

$('#boardDetails').on('click', '.cardEditIcon', showEditCard);
$('#boardDetails').on('focusout', 'input.cardInput', hideEditCard);
$('#boardDetails').on('click', '.cardDeleteIcon', deleteCard);
$('#boardDetails').on('keydown', 'input.cardInput', updateCard);

store.subscribe(render);
