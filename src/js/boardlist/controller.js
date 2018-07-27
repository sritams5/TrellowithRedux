import 'jquery';
import 'jquery-ui';

import listBox from './view';
import store from '../state';

require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/disable-selection');


function showListEdit(event) {
  listBox.showListEditForm(event.target.getAttribute('boardlistId'));
}
$('#boardDetails').on('click', '.listEditIcon', showListEdit);
function deleteList(event) {
  store.dispatch({
    type: 'DELETELIST',
    listId: event.target.getAttribute('boardlistId'),
  });
}
$('#boardDetails').on('click', '.listDeleteIcon', deleteList);
function updateListDetails(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    store.dispatch({
      type: 'UPDATELIST',
      name: event.target.value,
      listId: event.target.getAttribute('boardlistId'),
    });
    return false;
  } if (event.keyCode === 27) {
    listBox.hideListEditForm(event.target.getAttribute('boardlistId'));
  }

  return true;
}
$('#boardDetails').on('keydown', 'input.listInput', updateListDetails);

function hideListEdit(event) {
  listBox.hideListEditForm(event.target.getAttribute('boardlistId'));
}
$('#boardDetails').on('focusout', 'input.listInput', hideListEdit);
function addNewCard(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    store.dispatch({
      type: 'ADDCARD',
      name: event.target.value,
      listId: event.target.getAttribute('boardlistId'),
    });
    return false;
  } if (event.keyCode === 27) {
    // console.log('in controller addNewCard escape');
    listBox.hideAddCards(event.target.getAttribute('boardlistId'));
  }
  return true;
}
$('#boardDetails').on('keydown', 'input.newCard', addNewCard);

function showEditCard(event) {
  const listId = event.target.getAttribute('boardlistId');
  const cardId = event.target.getAttribute('cardViewId');
  listBox.showEditCard(listId, cardId);
}
$('#boardDetails').on('click', '.cardEditIcon', showEditCard);

function hideEditCard(event) {
  const listId = event.target.getAttribute('boardlistId');
  const cardId = event.target.getAttribute('cardViewId');
  listBox.hideEditCard(listId, cardId);
}
$('#boardDetails').on('focusout', 'input.cardInput', hideEditCard);

function updateCard(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    const listId = event.target.getAttribute('boardlistId');
    const cardId = event.target.getAttribute('cardViewId');
    store.dispatch({
      type: 'UPDATECARD',
      name: event.target.value,
      listId,
      cardId,
    });
    return false;
  } if (event.keyCode === 27) {
    const listId = event.target.getAttribute('boardlistId');
    const cardId = event.target.getAttribute('cardViewId');
    listBox.hideEditCard(listId, cardId);
  }
  return true;
}
$('#boardDetails').on('keydown', 'input.cardInput', updateCard);
function deleteCard(event) {
  const listId = event.target.getAttribute('boardlistId');
  const cardId = event.target.getAttribute('cardViewId');
  store.dispatch({
    type: 'DELETECARD',
    listId,
    cardId,
  });
}
$('#boardDetails').on('click', '.cardDeleteIcon', deleteCard);

function showAddCards(event) {
  listBox.showAddCards(event.target.getAttribute('boardlistId'));
}
$('#boardDetails').on('click', 'div.card-footer a', showAddCards);

function hideAddCards(event) {
  listBox.hideAddCards(event.target.getAttribute('boardlistId'));
}
$('#boardDetails').on('focusout', 'input.newCard', hideAddCards);


function doSwappable() {
  $('#boardDetails').sortable({
    handle: '.card-header',
    update() {
      const position = [];
      const lis = this.getElementsByClassName('m_listBox');
      for (let i = 0; i < lis.length; i += 1) {
        position.push((lis[i].getAttribute('boardlistId')));
      }


      store.dispatch({
        type: 'REPOSITIONLIST',
        position,
      });
    },
  });
  $('.m_card_list').sortable({
    connectWith: 'ul',
    update() {
      const tempListId = this.getAttribute('boardlistId');

      const tempCardList = [];

      const lis = this.getElementsByTagName('li');
      // console.log(lis);
      for (let i = 0; i < lis.length; i += 1) {
        const tp = lis[i].getElementsByTagName('p');
        tempCardList.push(tp[0].innerText);
      }

      store.dispatch({
        type: 'RESETLIST',
        cards: tempCardList,
        listId: tempListId,
      });
    },
  });
}

store.subscribe(() => {
  const state = store.getState();
  if (state.ibdSelected >= 0) {
    const listItems = state.boards[state.ibdSelected].lists;
    listBox.showLists(listItems);
    doSwappable();
    if (state.selectedListId) {
      listBox.showAddCards(state.selectedListId);
    }
  } else {
    listBox.hideLists();
  }
});
