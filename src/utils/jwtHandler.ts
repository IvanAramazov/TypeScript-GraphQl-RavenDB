import * as jsonwebtoken from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";

const pathToKey = path.join(__dirname, '../..', 'id_rsa_priv.pem')
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

export function issueJwt(user) {
    const userId = user.id;
    const expiresIn = '7d'
    const payload = {
        sub: userId,
        iat: Date.now()
    };
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn: expiresIn, algorithm: "RS256"})

    return {
        token: `${signedToken}`,
        expires: expiresIn
    }
}