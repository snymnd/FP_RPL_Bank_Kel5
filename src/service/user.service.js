const { getAllUser } = require("../controllers/tasks");

class TaskService{
    constructor(taskModel){
        this.taskModel = taskModel;
    }


    async createUser(data) {
        const user = await this.taskModel.create(data);
        return user;
    }

    async getUser(id) {
        const user = await this.taskModel.findOne({ _id: id}, {
            password: 0,
            pinATM: 0
        });
        return user;
    }

    async updateUser(id, data) {
        const user = await this.taskModel.findOneAndUpdate({ _id: id }, data, {
            new: true,
            runValidators: true,
        });
    }

    async deleteUser(id) {
        const user = await this.taskModel.findOneAndDelete({ _id: id });
        return user;
    }

    async getAllUser() {
        const users = await this.taskModel.find({});
        return users;
    }
}

module.exports = TaskService;