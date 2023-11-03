import 'dotenv/config'

export function authMiddleware(req, res, next) {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if(login && password && login === process.env.LOGIN && password === process.env.PASSWORD) {
        return next();
    }

    return res.sendStatus(401);
}