import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from 'react-native';

const api_url = 'http://localhost:3000';

const App = () => {

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isModal, setIsModal] = useState(false);

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

  // const handleDeleteTodo = async data => {
  //   try {
  //     const options = {
  //       method: 'POST', // fai un soft delete (post request, aggiungi una colonna in DB eg. deleted_on e dagli un flag/valore della data di deletion. Se non hai la deletion date specificata, allora il todo non e' mai stato eliminato )
  //       // quando fai fetch if (todo == !null) non vengono mostrati nel todolist quando fai fetch
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify({ data })
  //     }
  //     await fetch(`${api_url}/todo`, options)
  //     fetchTodos(api_url)
  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // }

  const renderTodos = todos => {
    return (
      <View>
        {todos.map(({body}, index) => {
          return (
            <View style={styles.todo} key={index}>
              <View style={{...styles.todoButton, backgroundColor: 'rgba(0, 255, 0, 0.1)'}}>
                <Text style={styles.centerText}>✔︎</Text>
              </View>

              <View style={styles.todoBody}><Text>{body}</Text></View>

              <View style={{...styles.todoButton, backgroundColor: 'rgba(0, 0, 255, 0.1)'}}>
                <Text style={styles.centerText}>✎</Text>
              </View>
              <View style={{...styles.todoButton, backgroundColor: 'rgba(255, 0, 0, 0.1)'}}>
                <Text style={styles.centerText}>✖︎</Text>
              </View>
            </View>
          )
        })}
      </View>
    )
  }

  return (
    <>
    <View style={styles.scrollView}>
      <View style={styles.section}>
        <Button 
          title="ADD TODO"
          color="#aabbcc"
          onPress={() => setIsModal(!isModal)} />
          <Modal
            animationType="slide"
            transparent={false}
            visible={isModal}
          >
            <TextInput 
              placeholder="write a todo" 
              onChangeText={value => setInputValue(value)} />
            <Button 
              title="send"
              onPress={() => handleAddTodo(inputValue)} />
            <Button 
              color="#771111"
              title="close modal"
              onPress={() => setIsModal(!isModal)}
            />
          </Modal>
      </View>
      <View style={styles.section}>
        <Text>Todo list</Text>
        {todos.length <= 0 ? <Text>empty</Text> : renderTodos(todos)}
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
    width: '70%',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  centerText: {
    textAlign: 'center',
  },
  todoButton: {
    width: '10%',
  },
});

export default App;
