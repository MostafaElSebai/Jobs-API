import mongoose from "mongoose";
const jobSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, "please provide a company"]
    },
    position: {
        type: String,
        required: [true, "Please provide a position"]
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a user"]
    }
}, { timestamps: true });

export default mongoose.model("Job", jobSchema)