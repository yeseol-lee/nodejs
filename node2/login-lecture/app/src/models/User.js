"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        //await은 프로미스를 반환하는 애에게 주는 옵션임
        const { id, psword } = await UserStorage.getUserInfo(client.id);
    
        if(id) {
            if (id === client.id && psword === client.psword) {
                return { success: true };
            }
            return { success: false, msg: "비밀번호가 틀렸습니다."};
        }
       
        return { success: false, msg: "존재하지 않는 아이디입니다."};

    }

    register() {
        const client = this.body;
        const response = UserStorage.save(client);
        return response;
        UserStorage.save(client);
    }
}

module.exports = User;