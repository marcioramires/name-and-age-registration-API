import mongoose from "mongoose";

async function connectDatabase() {
    await mongoose.connect('mongodb+srv://marcioramires:d16m4a84@cluster0.5pzx8q3.mongodb.net/?retryWrites=true&w=majority')
}

export default connectDatabase