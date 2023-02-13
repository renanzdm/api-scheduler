import jwt from "jsonwebtoken";
import { env } from "process";
export class JsonWebTokenServiceImpl {
    decodeToken(token) {
        try {
            return jwt.decode(token);
        }
        catch (error) {
            return null;
        }
    }
    signToken(data, expiresIn) {
        const token = jwt.sign(data, env.TOKEN_KEY, { expiresIn });
        return token;
    }
    verifyToken(token) {
        try {
            const tokenVerify = jwt.verify(token, env.TOKEN_KEY);
            if (tokenVerify != null) {
                return true;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }
}
//# sourceMappingURL=Utils.js.map