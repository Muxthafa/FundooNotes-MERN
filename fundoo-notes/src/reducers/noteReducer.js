const notes = {
  Notes: [],
  filteredNotes: [],
  trash: [],
  pin: [],
  trashState: "false",
  gridState: false,
  MyNotes: {
    Note: "First Note",
  },
};

export const noteReducer = (state = notes, { type, payload }) => {
  switch (type) {
    case "SET_NOTES":
      return {
        ...state,
        Notes: payload,
      };
    case "SET_FILTERED_NOTES":
      return {
        ...state,
        filteredNotes: payload,
      };
    case "SET_TASK":
      return {
        ...state,
        MyNotes: { ...state.MyNotes, Note: payload },
      };
    case "SET_CREATE_NOTES":
      return {
        ...state,
        Notes: [...state.Notes, payload],
      };
    case "SET_UPDATE_NOTE":
      let newNote = [...state.Notes];
      newNote[payload.index] = payload.data;
      return {
        ...state,
        Notes: newNote,
      };

    case "SET_TRASH_NOTE":
      return {
        ...state,
        trash: payload,
      };

    case "ADD_TRASH_NOTE":
      let updatedNote = state.Notes.filter((note) => note._id !== payload._id);
      let updatedTrashNote = [...state.trash];
      updatedTrashNote.push(payload);
      return { ...state, Notes: updatedNote, trash: updatedTrashNote };

    case "REMOVE_TRASH_NOTE":
      let updatedTrash = state.trash.filter((note) => note._id !== payload._id);
      let updatedNotes = [...state.Notes];
      updatedNotes.push(payload);
      return { ...state, Notes: updatedNotes, trash: updatedTrash };

    case "SET_PIN_NOTE":
      let newNotes = state.Notes.filter((note) => note._id !== payload._id);
      let updatedPin = [...state.pin];
      updatedPin.push(payload);
      return {
        ...state,
        Notes: newNotes,
        pin: updatedPin,
      };

    case "SET_DELETE_NOTE":
      let newTrash = state.trash.filter((note) => note._id !== payload._id);
      return {
        ...state,
        trash: newTrash,
      };
    case "SET_TRASH_VALUE":
      return {
        ...state,
        trashState: payload,
      };
    case "SET_VIEW":
      return {
        ...state,
        gridState: !state.gridState,
      };
    default:
      return state;
  }
};
