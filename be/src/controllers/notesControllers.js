import e from 'express';
import express from 'express';
import Note from '../models/Note.js';

export async function getNotes(req, res) {
  try {
    // Logic to get notes from the database
  const notes = await Note.find().sort({ createdAt: -1 });
  res.status(200).json(notes);
} catch (error) {
  console.log(error);
  res.status(500).json({ message: error.message });
  }
}

export async function getNoteById(req, res) {
  try{
    const note = await Note.findById(req.params.id);
    if(!note) {
        return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
} catch (error) {
  res.status(500).json({ message: error.message });
  }
}

export async function createNote(req, res) {
    try { 
         // Logic to create a new note in the database
         const { title, content } = req.body;
         const note = new Note({title: title, content: content});
         const savedNote = await note.save();
         res.status(201).json(savedNote);
} catch (error) {  res.status(500).json({ message: error.message });
  }
}

export async function updateNote(req, res) {
    try {
    const {title,content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});
    if(!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
    }  
    res.status(200).json(updatedNote);
} catch (error) {  res.status(500).json({ message: error.message });
  }
}

export async function deleteNote(req, res) {
    try {    
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote) {
        return res.status(404).json({ message: 'Note not found' });
    }  
    res.status(200).json({ message: 'Note deleted successfully' });
} catch (error) {  res.status(500).json({ message: error.message });
  } 
}

