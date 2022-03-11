const TaskService = require("./task.service");
const Task = require("../models/Task.model");
describe("Task service", () => {
  const task = {
    email: "umuy6@gmail.com",
    name: "Kim Dammy4",
    NIK: 9991347161384522,
    alamat: "Rusia",
    noTelp: "08129364822",
    password: "Uraaaaaa",
    saldo: 1000000,
    noRek: "56945734",
    pinATM: "999999",
  };

  test("Shoud return created data with id of string", async () => {
    const taskServiceInstance = new TaskService(Task);

    Task.create = jest.fn().mockResolvedValue({
      id: "123",
      ...task,
    });

    const result = await taskServiceInstance.createUser(task);
    expect(Task.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      id: expect.any(String),
      ...task,
    });
  });
});
