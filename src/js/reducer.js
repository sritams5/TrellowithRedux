
function getCopyCurrentState(currentState) {
  const newState = {};
  if ('selectedBoardId' in currentState) {
    newState.selectedBoardId = currentState.selectedBoardId;
  } else {
    newState.selectedBoardId = -1;
  }

  newState.boards = [];
  currentState.boards.forEach((board) => {
    const currIndex = newState.boards.length;
    newState.boards[currIndex] = {
      name: board.name,
      lists: [],
    };

    const tempList = [];
    board.lists.forEach((list) => {
      const currListIndex = tempList.length;
      tempList[currListIndex] = {
        name: list.name,
        cards: [],
      };

      const cardsList = [];

      list.cards.forEach((card) => {
        cardsList[cardsList.length] = {
          name: card.name,
        };
      });

      tempList[currListIndex].cards = cardsList;
    });
    newState.boards[currIndex].lists = tempList;
  });
  return newState;
}

function reducer(currentState = { selectedBoardId: -1, boards: [] }, action) {
  const newState = getCopyCurrentState(currentState);
  switch (action.type) {
    case 'LOADDATA': {
      newState.selectedBoardId = -1;
      newState.boards = action.data;
      break;
    }
    case 'SHOWBOARDS': {
      newState.selectedBoardId = -1;
      break;
    }
    case 'SHOWBOARDDETAIL': {
      newState.selectedBoardId = action.boardId;
      break;
    }
    case 'REORDERBOARD': {
      const { order } = action;
      console.log("order-"+order);
      order.forEach((newIndex, index) => {
        console.log(order);
        newState.boards[index] = currentState.boards[newIndex];
      });
      break;
    }
    case 'REORDERLIST': {
      const { order } = action;
      const boardId = currentState.selectedBoardId;
      order.forEach((newIndex, index) => {
        newState.boards[boardId].lists[index] = currentState.boards[boardId].lists[newIndex];
      });
      break;
    }
    case 'ADDBOARD': {
      const { name } = action;
      const boardLength = newState.boards.length;
      newState.boards[boardLength] = {
        name,
        lists: [],
      };
      break;
    }
    case 'DELETEBOARD': {
      const { boardId } = action;
      newState.boards.splice(boardId, 1);
      break;
    }
    case 'UPDATEBOARD': {
      const { boardId, name } = action;
      newState.boards[boardId].name = name;
      break;
    }
    case 'ADDLIST': {
      const { name } = action;
      const boardId = currentState.selectedBoardId;
      newState.boards[boardId].lists[newState.boards[boardId].lists.length] = {
        name,
        cards: [],
      };
      break;
    }
    case 'UPDATELIST': {
      const { name, listId } = action;
      const boardId = currentState.selectedBoardId;
      newState.boards[boardId].lists[listId].name = name;
      break;
    }
    case 'DELETELIST': {
      const { listId } = action;
      const boardId = currentState.selectedBoardId;
      newState.boards[boardId].lists.splice(listId, 1);
      break;
    }
    case 'ADDCARD': {
      const boardId = currentState.selectedBoardId;
      const { listId, name } = action;
      const cardlength = newState.boards[boardId].lists[listId].cards.length;
      newState.boards[boardId].lists[listId].cards[cardlength] = {
        name,
      };
      newState.selectedListId = listId;
      break;
    }
    case 'RESETLIST': {
      const boardId = currentState.selectedBoardId;
      const { listId, cards } = action;
      newState.boards[boardId].lists[listId].cards = [];
      cards.forEach((card) => {
        const cardLength = newState.boards[boardId].lists[listId].cards.length;
        newState.boards[boardId].lists[listId].cards[cardLength] = {
          name: card,
        };
      });
      break;
    }
    case 'DELETECARD': {
      const boardId = currentState.selectedBoardId;
      const { listId, cardId } = action;
      newState.boards[boardId].lists[listId].cards.splice(cardId, 1);
      break;
    }
    case 'UPDATECARD': {
      const boardId = currentState.selectedBoardId;
      const { listId, cardId, name } = action;
      newState.boards[boardId].lists[listId].cards[cardId].name = name;
      break;
    }
    default:
  }
  return newState;
}
export default reducer;
