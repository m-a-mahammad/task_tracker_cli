import fs from "fs";

interface taskItf {
  id: number;
  description: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

enum taskStatusEnum {
  todo = "todo",
  inProgress = "in-progress",
  completed = "done",
}

// task-cli
const taskCLI = () => {
  if (!fs.existsSync("tasks.json")) fs.writeFileSync("tasks.json", "[]");

  if (process.argv[2] === "task-cli") {
    if (process.argv[3] === "list") {
      // task-cli list
      if (process.argv[process.argv.length - 1] === "list") {
        console.log(fs.readFileSync("tasks.json", "utf-8"));
        return;
      }
      // task-cli list done
      if (process.argv[4] === "done") {
        const tasks: taskItf[] = JSON.parse(
          fs.readFileSync("tasks.json", "utf-8")
        );
        const completedTasks = tasks.filter((task) => task.status === "done");
        console.log(JSON.stringify(completedTasks));
        return;
      }
      // task-cli list in-progress
      if (process.argv[4] === "in-progress") {
        const tasks: taskItf[] = JSON.parse(
          fs.readFileSync("tasks.json", "utf-8")
        );
        const inProgressTasks = tasks.filter(
          (task) => task.status === "in-progress"
        );
        console.log(JSON.stringify(inProgressTasks));
        return;
      }
      // task-cli list todo
      if (process.argv[4] === "todo") {
        const tasks: taskItf[] = JSON.parse(
          fs.readFileSync("tasks.json", "utf-8")
        );
        const todoTasks = tasks.filter((task) => task.status === "todo");
        console.log(JSON.stringify(todoTasks));
        return;
      }
      console.log(
        "options available are [list, list done, list in-progress, list todo]"
      );
      return;
    }

    // task-cli add "Buy groceries"
    if (process.argv[3] === "add") {
      const tasks: taskItf[] = JSON.parse(
        fs.readFileSync("tasks.json", "utf-8")
      );

      const newTask = {
        id: (tasks[tasks.length - 1]?.id || 0) + 1,
        description: process.argv[4] || "",
        status: taskStatusEnum.todo,
        createdAt: new Date().toLocaleString("en"),
        updatedAt: new Date().toLocaleString("en"),
      };

      tasks.push(newTask);
      fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
      console.log(`Task added successfully (ID: ${newTask.id})`);
    }

    // task-cli update 1 "Buy groceries and cook dinner"
    if (process.argv[3] === "update") {
      const tasks: taskItf[] = JSON.parse(
        fs.readFileSync("tasks.json", "utf-8")
      );

      if (isNaN(Number(process.argv[4]))) {
        throw new Error("Task id is required");
      }

      const task = tasks.find((task) => task.id === Number(process.argv[4]));
      if (!task) {
        throw new Error(`No such task with id ${Number(process.argv[4])}`);
      }

      task.description = process.argv[5] || task.description;
      task.updatedAt = new Date().toLocaleString("en");
      fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
    }

    // task-cli delete 1
    if (process.argv[3] === "delete") {
      const tasks: taskItf[] = JSON.parse(
        fs.readFileSync("tasks.json", "utf-8")
      );

      if (isNaN(Number(process.argv[4]))) {
        throw new Error("Task id is required");
      }

      const remainedTasks = tasks.filter(
        (task) => task.id !== Number(process.argv[4])
      );

      fs.writeFileSync("tasks.json", JSON.stringify(remainedTasks, null, 2));
    }

    // task-cli mark-in-progress 1
    if (process.argv[3] === "mark-in-progress") {
      const tasks: taskItf[] = JSON.parse(
        fs.readFileSync("tasks.json", "utf-8")
      );

      if (isNaN(Number(process.argv[4]))) {
        throw new Error("Task id is required");
      }

      const task = tasks.find((task) => task.id === Number(process.argv[4]));
      if (!task) {
        throw new Error(`No such task with id ${Number(process.argv[4])}`);
      }

      task.status = taskStatusEnum.inProgress;
      fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
    }

    // task-cli mark-done 1
    if (process.argv[3] === "mark-done") {
      const tasks: taskItf[] = JSON.parse(
        fs.readFileSync("tasks.json", "utf-8")
      );

      if (isNaN(Number(process.argv[4]))) {
        throw new Error("Task id is required");
      }

      const task = tasks.find((task) => task.id === Number(process.argv[4]));
      if (!task) {
        throw new Error(`No such task with id ${Number(process.argv[4])}`);
      }

      task.status = taskStatusEnum.completed;
      fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
    }

    console.log(
      "options available are [list, add, update, delete, mark-in-progress, mark-done]"
    );
  } else {
    console.log("task-cli command is required as a first argument");
    return;
  }
};

taskCLI();
