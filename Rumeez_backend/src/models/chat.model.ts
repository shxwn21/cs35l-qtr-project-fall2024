import chat from "./chat.interface"
import mongoose, { Schema, Model } from 'mongoose';

const chatSchema = new Schema<chat>({
    chatName: {
        type: String,
        required: false,
        trim: true,
    },
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    users: {
        type: [String],
        required: false,
    },
    messages: 
    {
        type: [[String]],
        required: false,
    }
});

const chatModel: Model<chat> = mongoose.model<chat>('Chat', chatSchema);

export default chatModel;