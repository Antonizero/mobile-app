import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal, TextInput, Button} from 'react-native';

const api_url = 'http://localhost:3000';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isModal, setIsModal] = useState({
    visible: false,
    add: false,
    edit: false,
    todo: {},
  });

  useEffect(() => {
    fetchTodos(api_url);
  }, []);

  const fetchTodos = async (url) => {
    try {
      const response = await fetch(`${url}/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleAddTodo = async (data) => {
    try {
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data}),
      };
      await fetch(`${api_url}/todo`, options);
      fetchTodos(api_url);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleEditTodo = (newValue) => {
    console.log('newValue: ', newValue);
  };

  const modalContent = () => {
    return (
      <View>
        {isModal.edit ? (
          <View>
            <TextInput
              placeholder="editing ..."
              onChangeText={(value) => setInputValue(value)}
              value={inputValue}
            />
            <Button
              title="submit changes"
              onPress={() => handleEditTodo(inputValue)}
            />
          </View>
        ) : (
          <View>
            <TextInput
              placeholder="write a todo"
              onChangeText={(value) => setInputValue(value)}
            />
            <Button
              title="add to the list"
              onPress={() => handleAddTodo(inputValue)}
            />
          </View>
        )}
        <Button
          color="#771111"
          title="close modal"
          onPress={() =>
            setIsModal({visible: false, add: false, edit: false, todo: {}})
          }
        />
      </View>
    );
  };

  const renderTodos = () => {
    return (
      <View>
        {todos.map(({_id, body}, index) => {
          return (
            <View style={styles.todo} key={index}>
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.todoButton,
                  backgroundColor: 'rgba(0, 255, 0, 0.1)',
                }}>
                <Text style={styles.centerText}>✔</Text>
              </View>
              <View style={styles.todoBody}>
                <Text
                  onPress={() => {
                    setInputValue(body);
                    setIsModal({
                      visible: true,
                      add: false,
                      edit: true,
                      todo: {_id, body},
                    });
                  }}>
                  {body}
                </Text>
              </View>
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.todoButton,
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                }}>
                <Text style={styles.centerText}>✖︎</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <View style={styles.scrollView}>
        <View style={styles.section}>
          <Button
            title="new"
            color="#aabbcc"
            onPress={() =>
              setIsModal({visible: true, add: true, edit: false, todo: {}})
            }
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={isModal.visible}>
            {modalContent()}
          </Modal>
        </View>
        <View style={styles.section}>
          <Text>Todo list</Text>
          {todos.length <= 0 ? <Text>empty</Text> : renderTodos()}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
  },
  scrollView: {
    backgroundColor: '#fff',
    padding: 5,
  },
  todo: {
    flexDirection: 'row',
    padding: 5,
    marginBottom: 5,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  todoBody: {
    width: '80%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingLeft: 5,
    paddingRight: 5,
  },
  centerText: {
    textAlign: 'center',
  },
  todoButton: {
    width: '10%',
  },
});

export default App;
