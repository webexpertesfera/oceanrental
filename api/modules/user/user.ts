import { User } from '../../database/user';

const getUsers = async (req: any, res: any) => {
    try {
        const users = await User.findAll();
        return res.json({ success: true, code: 200, data: users });
    } catch (err) {
        return res.json({
            success: false,
            code: 500,
            message: 'Failed to find Users',
        });
    }
};

const getUser = async (req: any, res: any) => {
    try {
        let where: any = {};
        if (req.query.id) {
            where['id'] = req.query.id;
        }

        const user = await User.findAll({
            where,
        });
        res.json({ success: true, data: user });
    } catch (err) {
        res.json({ success: false, message: 'Failed to fetch users' });
    }
};

const updateUser = async (req: any, res: any) => {
    try {
        const updateUser = req.body;
        let where: any = {};
        where['id'] = updateUser.id;

        const user = await User.findAll({
            where,
        });

        if (user.length === 0) {
            return res
                .json({ success: false, message: 'Invalid user' })
                .status(500);
        }

        await User.update(updateUser, { where });
        res.json({ success: true, data: updateUser });
    } catch (err) {
        res.json({ success: false, message: 'Failed to update users' });
    }
};

export { getUser, updateUser, getUsers };
