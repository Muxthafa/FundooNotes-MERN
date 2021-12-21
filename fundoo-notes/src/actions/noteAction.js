export const setMyNotes = (notes) => {
    return {
        type: "SET_NOTES",
        payload: notes,
    }
}

export const setFilteredNotes = (notes) => {
    return {
        type: "SET_FILTERED_NOTES",
        payload: notes,
    }
}

export const setTask = (notes) => {
    return {
        type: "SET_TASK",
        payload: notes,
    }
}

export const setCreate = (notes) => {
    return {
        type: "SET_CREATE_NOTES",
        payload: notes,
    }
}

export const setUpdate = (note) => {
    return {
        type: "SET_UPDATE_NOTE",
        payload: note,
    }
}

export const setTrash = (note) => {
    return {
        type: "SET_TRASH_NOTE",
        payload: note,
    }
}

export const addTrashNote = (note) => {
    return {
      type: "ADD_TRASH_NOTE",
      payload: note,
    };
};

export const removeTrashNote = (note) => {
    return {
      type: "REMOVE_TRASH_NOTE",
      payload: note,
    };
  };

  export const setPinNotes = (note) => {
    return {
      type: "SET_PIN_NOTE",
      payload: note,
    };
  };

  export const deleteFromTrash = (note) => {
    return {
        type: "SET_DELETE_NOTE",
        payload: note,
      };
  }

  export const setTrashValue = (value) => {
    return {
      type: "SET_TRASH_VALUE",
      payload: value,
    };
  };

  export const GridView = () => {
    return {
      type: "SET_VIEW",
    };
  }


