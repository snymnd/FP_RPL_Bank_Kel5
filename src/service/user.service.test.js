const Task = require("../models/Task.model");
const TaskService = require("../services/task.service");


describe("getAlluser", () => {
    it("should return all user", async () => {
      const users = await TaskService.getAllUser();
      expect(users).toHaveLength(3);
    });
});
