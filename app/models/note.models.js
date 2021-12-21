/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : get the values from the service and process them for the notes in fundo notes                
 * 
 * @file            : note.models.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const mongoose = require("mongoose");
const logger = require("../../config/logger");

const { promisify } = require("util");
const fs = require("fs");
const unlinkAsync = promisify(fs.unlink);

//creation of schema for note collection
const NoteSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    isTrash: Boolean,
    color: String,
    image: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);

/**
 * @description Query to create a note
 * @param {String} title
 * @param {String} content
 * @param {String} userId
 * @param {callback} callback
 * @returns
 */
const createNote = (title, content, color, userId, callback) => {
  const note = new Note({
    title: title || "Untitled Note",
    content: content,
    isTrash: false,
    color: color,
    image: "",
    userId: userId,
  });
  // Save Note in the database
  return note.save({}, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description Query to find all notes
 * @param {String} userId
 * @param {callback} callback
 * @returns error or callback
 */
const findNotes = (userId, callback) => {
  return Note.find({ userId: userId })
    .populate({ path: "userId", select: "email" })
    .exec((error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
};

/**
 * @description Query to find one specific note
 * @param {String} userId
 * @param {String} id
 * @param {callback} callback
 * @returns error or callback
 */
const findSingleNote = (userId, id, callback) => {
  return Note.find({ userId: userId }, (error, data) => {
    if (error) {
      return callback(error, null);
    } else {
      let result = data.filter((obj) => id == obj._id);
      if (result.length == 0) return callback("No note found");
      else return callback(null, result);
    }
  });
};

/**
 * @description Query to find and update note
 * @param {String} id
 * @param {String} title
 * @param {String} content
 * @param {String} userId
 * @param {callback} callback
 * @returns
 */
const findSingleNoteAndUpdate = (
  id,
  title,
  content,
  color,
  image,
  userId,
  isTrash,
  callback
) => {
  return Note.findOne({ userId: userId, _id: id }, (error, data) => {
    if (error) {
      callback(error, null);
    }
    if (!data) {
      callback("No note found", null);
    }

    return Note.findByIdAndUpdate(
      id,
      { title: title, content: content, color: color, image:image,isTrash: isTrash },
      { new: true },
      (error, data) => {
        return error ? callback(error, null) : callback(null, data);
      }
    );
  });
};

/**
 * @description Query to find and remove a note
 * @param {String} id
 * @param {String} userId
 * @param {callback} callback
 * @returns
 */
const findAndRemove = (id, userId, callback) => {
  return Note.findOneAndRemove({ userId: userId, _id: id }, (error, data) => {
    if (error) {
      return callback(error, null);
    }
    if (!data) {
      return callback("No note found", null);
    }
    unlinkAsync(
      `C:\\Users\\mohammad.musthafa_ym\\Desktop\\notes-node-project\\uploads\\${data.image}`,
      (err, res) => {
       if (err) {
        logger.error(err);
       }
      }
     );
    return callback(null, data);
  });
};

module.exports = {
  createNote,
  findNotes,
  findSingleNote,
  findSingleNoteAndUpdate,
  findAndRemove,
};
