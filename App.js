import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button
} from 'react-native';

const api_url = 'http://localhost:3000';

const App = () => {

  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(()=>{
    fetchTodos(api_url);
  }, []);

  const fetchTodos = async url => {
    try {
      const response = await fetch(`${url}/todos`);
      const data = await response.json();
      setTodos(data);

    } catch (error) {
      throw new Error(error)
    }
  }

  const handleAddTodo = async data => {
    try {
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ data })
      }
      await fetch(`${api_url}/todo`, options)
      fetchTodos(api_url)
    } catch (error) {
      throw new Error(error)
    }
  }

  const renderTodos = todos => {
    return (
      <View>
        {todos.map(({body}, index) => {
          return (
            <View style={styles.todo} key={index}>
              <View style={styles.todoBody}><Text>{body}</Text></View>
              <View style={styles.todoDeleteButton}><Text>X</Text></View>
              <View style={styles.todoEditButton}><Text>E</Text></View>
            </View>
          )
        })}
      </View>
    )
  }

  return (
    <>
    <View style={styles.scrollView}>
      <TextInput 
        placeholder="write a todo" 
        onChangeText={value => setInputValue(value)} />
      <Button 
        title="send"
        onPress={() => handleAddTodo(inputValue)} />
      <Text>Todo list</Text>
      {todos.length <= 0 ? <Text>empty</Text> : renderTodos(todos)}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  todo: {
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  todoBody: {
    width: '80%',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  todoDeleteButton: {
    width: '10%',
    backgroundColor: 'rgba(255,0,0,0.1)'
  },
  todoEditButton: {
    width: '10%',
    backgroundColor: 'rgba(0,0,255,0.1)'
  }
});

export default App;
