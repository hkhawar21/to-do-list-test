import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import editIcon from "../assets/icons/edit.png";
import trashIcon from "../assets/icons/trash/trash.png";
import { Task } from "./TasksList";

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  updateTaskName: (id: number, newTaskName: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  index,
  task,
  toggleTaskDone,
  removeTask,
  updateTaskName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskText, setEditingTaskText] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEdition() {
    setIsEditing(true);
  }

  function handleCancelEdition() {
    setIsEditing(false);
    setEditingTaskText(task.title);
  }

  function handleSubmitEditing() {
    updateTaskName(task.id, editingTaskText);
    setIsEditing(false);
  }

  function handleRemoveTask(id: number) {
    if (!isEditing) {
      Alert.alert(
        "Remover tarefa",
        "Tem certeza que deseja remover essa tarefa?",
        [
          { text: "Não" },
          {
            text: "Sim",
            onPress: () => removeTask(id),
          },
        ]
      );
    }
  }

  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={1}
          style={styles.taskButton}
          accessibilityLabel={`task-item-button-${index}`}
        >
          <TouchableOpacity
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
            onPress={() => toggleTaskDone(task.id)}
            accessibilityLabel={`task-item-checkbox-${index}`}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </TouchableOpacity>
          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            editable={isEditing}
            onChangeText={setEditingTaskText}
            value={editingTaskText}
            onSubmitEditing={handleSubmitEditing}
            accessibilityLabel={`task-item-text-${index}`}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        <TouchableOpacity
          testID={`edit-${index}`}
          style={{
            paddingHorizontal: 12,
            borderRightColor: "rgba(196, 196, 196, 0.24)",
            borderRightWidth: 1,
          }}
          onPress={!isEditing ? handleStartEdition : handleCancelEdition}
          accessibilityLabel={`task-item-edit-${index}-${
            isEditing ? "done" : "start"
          }`}
        >
          {!isEditing ? (
            <Image source={editIcon} />
          ) : (
            <Icon name="x" size={24} color="#bbb" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{
            paddingLeft: 12,
            paddingRight: 24,
          }}
          onPress={() => handleRemoveTask(task.id)}
          accessibilityLabel={`task-item-trash-${index}`}
        >
          <Image style={{ opacity: isEditing ? 0.4 : 1 }} source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  taskButton: {
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
