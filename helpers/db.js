import mongoose from 'mongoose';
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel()
};

function userModel() {
    const schema = new Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
    }, {
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}