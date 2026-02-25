 import mongoose from "mongoose";

 // 1. Create a schema for the Note model
 // 2. Define the fields and their types

 const noteSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true  
        },     
    },
    {timestamps: true}
);

const Note = mongoose.model('Note', noteSchema);

export default Note;