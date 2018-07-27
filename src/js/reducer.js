function getCopyCurrentState(currentState) {
  const nextState = {};
  if ('ibdSelected' in currentState) {
    nextState.ibdSelected = currentState.ibdSelected;
  } else {
    nextState.ibdSelected = -1;
  }

  nextState.boards = [];
  currentState.boards.forEach((board) => {
    const currIndex = nextState.boards.length;
    nextState.boards[currIndex] = {
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
    nextState.boards[currIndex].lists = tempList;
  });
  return nextState;
}

function reducer(currentState = { ibdSelected: -1, boards: [] }, action) {
  const nextState = getCopyCurrentState(currentState);
  switch (action.type) {
    case 'LOADDATA': {
      nextState.ibdSelected = -1;
      nextState.boards = action.data;
      break;
    }
    case 'SHOWBOARDS': {
      nextState.ibdSelected = -1;
      break;
    }
    case 'BOARDDETAIL': {
      nextState.ibdSelected = action.boardId;
      break;
    }
    case 'REPOSITIONBOARD': {
      const { position } = action;
      console.log("position-"+position);
      position.forEach((newIndex, index) => {
        console.log(position);
        nextState.boards[index] = currentState.boards[newIndex];
      });
      break;
    }
    case 'REPOSITIONLIST': {
      const { position } = action;
      const boardId = currentState.ibdSelected;
      position.forEach((newIndex, index) => {
        nextState.boards[boardId].lists[index] = currentState.boards[boardId].lists[newIndex];
      });
      break;
    }
    case 'CREATEBOARD': {
      const { name } = action;
      const boardLength = nextState.boards.length;
      nextState.boards[boardLength] = {
        name,
        lists: [],
      };
      break;
    }
    case 'DELETEBOARD': {
      const { boardId } = action;
      nextState.boards.splice(boardId, 1);
      break;
    }
    case 'UPDATEBOARD': {
      const { boardId, name } = action;
      nextState.boards[boardId].name = name;
      break;
    }
    case 'CREATELIST': {
      const { name } = action;
      const boardId = currentState.ibdSelected;
      nextState.boards[boardId].lists[nextState.boards[boardId].lists.length] = {
        name,
        cards: [],
      };
      break;
    }
    case 'UPDATELIST': {
      const { name, listId } = action;
      const boardId = currentState.ibdSelected;
      nextState.boards[boardId].lists[listId].name = name;
      break;
    }
    case 'DELETELIST': {
      const { listId } = action;
      const boardId = currentState.ibdSelected;
      nextState.boards[boardId].lists.splice(listId, 1);
      break;
    }
    case 'ADDCARD': {
      const boardId = currentState.ibdSelected;
      const { listId, name } = action;
      const cardlength = nextState.boards[boardId].lists[listId].cards.length;
      nextState.boards[boardId].lists[listId].cards[cardlength] = {
        name,
      };
      nextState.selectedListId = listId;
      break;
    }
    case 'RESETLIST': {
      const boardId = currentState.ibdSelected;
      const { listId, cards } = action;
      nextState.boards[boardId].lists[listId].cards = [];
      cards.forEach((card) => {
        const cardLength = nextState.boards[boardId].lists[listId].cards.length;
        nextState.boards[boardId].lists[listId].cards[cardLength] = {
          name: card,
        };
      });
      break;
    }
    case 'DELETECARD': {
      const boardId = currentState.ibdSelected;
      const { listId, cardId } = action;
      nextState.boards[boardId].lists[listId].cards.splice(cardId, 1);
      break;
    }
    case 'UPDATECARD': {
      const boardId = currentState.ibdSelected;
      const { listId, cardId, name } = action;
      nextState.boards[boardId].lists[listId].cards[cardId].name = name;
      break;
    }
    default:
  }
  return nextState;
}
export default reducer;
