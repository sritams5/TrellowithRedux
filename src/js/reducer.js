
function getCopyCurrentState(currentState) {
  const newState = {};
  if ('selectedBoardId' in currentState) {
    newState.selectedBoardId = currentState.selectedBoardId;
  } else {
    newState.selectedBoardId = -99;
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

function reducer(currentState = { selectedBoardId: -999, boards: [] }, action) {
  const newState = getCopyCurrentState(currentState);
  switch (action.type) {
    case 'LOAD_DATA': {
      newState.selectedBoardId = -99;
      newState.boards = action.data;
      break;
    }
    case 'SHOW_BOARDS': {
      newState.selectedBoardId = -99;
      break;
    }
    case 'SHOW_BOARD_DETAIL': {
      newState.selectedBoardId = action.boardId;
      break;
    }
    case 'RE_ORDER_BOARD': {
      const { order } = action;
      order.forEach((newIndex, index) => {
        newState.boards[index] = currentState.boards[newIndex];
      });
      break;
    }
    case 'RE_ORDER_LIST': {
      const { order } = action;
      const boardId = currentState.selectedBoardId;
      order.forEach((newIndex, index) => {
        newState.boards[boardId].lists[index] = currentState.boards[boardId].lists[newIndex];
      });
      break;
    }
    case 'ADD_BOARD': {
      const { name } = action;
      const boardLength = newState.boards.length;
      newState.boards[boardLength] = {
        name,
        lists: [],
      };
      break;
    }
    case 'DEL_BOARD': {
      const { boardId } = action;
      newState.boards.splice(boardId, 1);
      break;
    }
    case 'UPDT_BOARD': {
      const { boardId, name } = action;
      newState.boards[boardId].name = name;
      break;
    }
    case 'ADD_LIST': {
      const { name } = action;
      const boardId = currentState.selectedBoardId;
      newState.boards[boardId].lists[newState.boards[boardId].lists.length] = {
        name,
        cards: [],
      };
      break;
    }
    case 'UPDT_LIST': {
      const { name, listId } = action;
      const boardId = currentState.selectedBoardId;
      newState.boards[boardId].lists[listId].name = name;
      break;
    }
    case 'DEL_LIST': {
      const { listId } = action;
      const boardId = currentState.selectedBoardId;
      newState.boards[boardId].lists.splice(listId, 1);
      break;
    }
    case 'ADD_CARD': {
      const boardId = currentState.selectedBoardId;
      const { listId, name } = action;
      const cardlength = newState.boards[boardId].lists[listId].cards.length;
      newState.boards[boardId].lists[listId].cards[cardlength] = {
        name,
      };
      newState.selectedListId = listId;
      break;
    }
    case 'RESET_LIST': {
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
    case 'DEL_CARD': {
      const boardId = currentState.selectedBoardId;
      const { listId, cardId } = action;
      newState.boards[boardId].lists[listId].cards.splice(cardId, 1);
      break;
    }
    case 'UPDT_CARD': {
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
