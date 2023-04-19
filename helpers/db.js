import mongoose from 'mongoose';
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel(),
    Video: videoModel(),
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

function videoModel() {
    const schema = new Schema({
        url: { type: String, unique: false, required: true },
        shareby: { type: String, unique: false, required: true },
        title: { type: String, unique: false, required: false },
        description: { type: String, unique: false, required: false },
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

    return mongoose.models.Video || mongoose.model('Video', schema);
}