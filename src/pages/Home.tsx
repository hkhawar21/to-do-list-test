import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";
import { DdLogs } from "@datadog/mobile-react-native";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const hasTaskWithThisName =
      tasks.findIndex((task) => task.title === newTaskTitle) > -1;

    if (hasTaskWithThisName) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      DdLogs.error("Task já cadastrada");
    } else {
      setTasks([
        ...tasks,
        {
          id: new Date().getTime(),
          title: newTaskTitle,
          done: false,
        },
      ]);
      DdLogs.info("Task added");
    }
  }

  function handleToggleTaskDone(id: number) {
    try {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            done: !task.done,
          };
        }

        return task;
      });

      setTasks(newTasks);
      DdLogs.info("Task done toggled");
    } catch (error) {
      DdLogs.error(`Error toggling task done ${error}`);
    }
  }

  function handleRemoveTask(id: number) {
    try {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
      DdLogs.info("Task removed");
    } catch (error) {
      DdLogs.error(`Error removing task ${error}`);
    }
  }

  function handleUpdateTaskName(id: number, newTaskName: string) {
    try {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title: newTaskName,
          };
        }

        return task;
      });
      setTasks(newTasks);
      DdLogs.info("Task name updated");
    } catch (error) {
      DdLogs.error(`Error updating task name ${error}`);
    }
  }

  return (
    <View
      style={styles.container}
      onLayout={() => {
        DdLogs.info("Home screen loaded");
      }}
    >
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        updateTaskName={handleUpdateTaskName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
