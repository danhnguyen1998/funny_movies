import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from "../../../helpers/db";
import { STATUS_CODE } from "../../../utils/common";

export default async function handler(req, res) {
    const User = db.User;
    const body = req.body;
    const user = await User.findOne({ username: body.username });
    if (await User.findOne({ username: body.username })) {
        if (!bcrypt.compareSync(body.password, user.hash)) {
            res.json({ message: 'Username or password is incorrect', status_code: STATUS_CODE.BAD_REQUEST });
        } else {
            const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.json({ token, username: user.username });
        }
    } else {
        const user = new User(body);
        if (body.password) {
            user.hash = bcrypt.hashSync(body.password, 10);
        }
        await user.save();
        const signedUser = await User.findOne({ username: body.username });
        const token = jwt.sign({ sub: signedUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, username: user.username });
    }
}