class TaskService {
  constructor(taskModel) {
    this.taskModel = taskModel;
  }
  async getAllUser() {
    const users = await this.taskModel.find({});
    return users;
  }

  async getUser(id) {
    const user = await this.taskModel.findOne({ _id: id });
    return user;
  }

  async deleteUser(id) {
    const user = await this.taskModel.findOneAndDelete({ _id: id });
    return user;
  }

  async updateUser(id, data) {
    const user = await this.taskModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
    return user;
  }

  async createUser(data) {
    const user = await this.taskModel.create(data);
    return user;
  }
}

module.exports = TaskService;
