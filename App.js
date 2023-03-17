import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Switch,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import {BlurView} from '@react-native-community/blur';

import FontAwesome from 'react-native-vector-icons/FontAwesome'

function App() {
  let linkImage =
    'https://www.pngitem.com/pimgs/m/96-962551_zelle-logo-banco-zelle-png-transparent-png.png';

  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [sexSelected, setSelectedSex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  // const [iconEye, setIconEye] = useState("eye-slash");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [tipos, setTipos] = useState([
    {key: 1, sex: 'Male'},
    {key: 2, sex: 'Female'},
    {key: 3, sex: 'I prefer not to identify'},
  ]);

  const [limit, setlimit] = useState(200);
  const [student, setStudent] = useState(false);
  const [results, setResults] = useState(false);

  let sexList = tipos.map((value, key) => {
    return <Picker.Item key={key} value={key} label={value.sex} />;
  });

  function register() {
    if (!name || !password ||  password.length < 5) return;

    setResults(true);
    setModalVisible(true);
  }

  function RegistrationData() {
    return (
      <View style={[styles.centralizingViewer, {marginTop: 10}]}>
        <View
          style={[
            styles.centralizingViewer,
            {
              width: '85%',
              borderRadius: 20,
              marginBottom: 10,
            },
          ]}>
          <View>
            <Text style={styles.titleDados}>Confirm your Credentials:</Text>
          </View>
          <View style={styles.dataArea}>
            <Text style={styles.dataText}>Name: {name}</Text>
            <Text style={styles.dataText}>password: {password}</Text>
            <Text style={styles.dataText}>
              Sex:{' '}
              {sexSelected ? tipos[sexSelected].sex : 'Male'}
            </Text>
            <Text style={styles.dataText}>
              chosen limit: R$ {Math.floor(limit)}
            </Text>
            <Text style={styles.dataText}>
              are you a student?: {student ? 'yes' : 'No'}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  const viewPassword = () =>{
    // setIconEye(iconEye === "eye-slash" ? "eye" : "eye-slash");
    // iconEye === "eye-slash" ? setSecureTextEntry(true) : setSecureTextEntry(false);
    setSecureTextEntry(prev => !prev);
  }

  return (
    <View style={styles.container}>

      <View style={styles.titleArea}>
        <Image source={{uri: linkImage}} style={{width: 100, height: 35}} />
      </View>

      <View style={styles.containerCadastro}>
        <Text style={styles.textRegister}>Welcome to Zelle:</Text>
      </View>

      <View style={styles.centralizingViewer}>
        <Text style={{color: '#6D1ED4', width: '85%'}}>Name: *</Text>
      </View>

   
      <View style={styles.inputViewer}>
        <TextInput
          style={styles.input}
          placeholder="Full name..."
          onChangeText={name => setName(name)}
        />
        <TouchableOpacity style={styles.btnUser}>
          <FontAwesome
          name="user"
          size={25}
          color="#000"/>
        </TouchableOpacity>
      </View>
   
   
      <View style={styles.centralizingViewer}>
        <Text style={{color: '#6D1ED4', width: '85%', marginTop: 10}}>
          Password: *
        </Text>
      </View>

      <View style={styles.inputViewer}>
        <TextInput
          style={[styles.input, {marginLeft: 5}]}
          placeholder="Password..."
          secureTextEntry={secureTextEntry}
          onChangeText={password => setPassword(password)}
        />
         <TouchableOpacity style={styles.btnUser} onPress={viewPassword}>
          <FontAwesome
          name={secureTextEntry ? 'eye' : 'eye-slash'}
          size={22}
          color="#000"/>
        </TouchableOpacity>
      </View>
      <View style={[styles.centralizingViewer]}>
        <Text style={{width: "85%"}}>Minimum 5 characters *</Text>
      </View>

      <View style={styles.centralizingViewer}>
        <Text style={[styles.textViewName, {marginTop: 20}]}>Sex:</Text>
      </View>

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Picker
          selectedValue={sexSelected}
          onValueChange={(itemValue, itemIndex) => setSelectedSex(itemValue)}
          style={{width: '93%', height: 40}}>
          {sexList}
        </Picker>
      </View>

      <View style={[styles.centralizingViewer, {marginTop: 15}]}>
        <Text style={styles.TextLimit}>Choose your limit:</Text>
      </View>

      <View style={styles.centralizingViewer}>
        <Slider
          value={limit}
          minimumValue={250}
          maximumValue={1000}
          onValueChange={limit => setlimit(limit)}
          minimumTrackTintColor="#6D1ED4"
          maximumTrackTintColor="#6D1ED4"
          thumbTintColor="#6D1ED4"
          style={{width: '85%'}}
        />
        <Text style={{color: '#000'}}>R$ {Math.floor(limit).toFixed(2)}</Text>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.viewSwitch}>
          <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
            {student ? 'I am a student' : "I'm not a student"}
          </Text>
          <Switch
            value={student}
            onValueChange={student => setStudent(student)}
            trackColor={{false: '#6D1ED4', true: '#6D1ED4'}}
            thumbColor={student ? '#6D1ED4' : '#FFF'}
          />
        </View>
      </View>

      <View style={[styles.centralizingViewer, {marginTop: 35}]}>
        <TouchableOpacity style={styles.ViewButton} onPress= {register}>
          <Text style={styles.textButton}>Register</Text>
        </TouchableOpacity>
      </View>
      
      
      <Modal visible={modalVisible} transparent={true} animationType="fade">
      
      <BlurView  style={{flex:1,}} blurRadius={2}>
      <View>
      
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.toggleCloseModal}>
            <Text style={{fontSize: 20,fontWeight: "bold"}}>X</Text>
          </TouchableOpacity>
        
          {results && <RegistrationData />}
          
          <View style={styles.containerCloseButton}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.CloseButton}>
            <Text style={styles.textButton}>Confirm</Text>
          </TouchableOpacity>
          </View>
        </View>
        </View>
        </BlurView>
      </Modal>
      
      
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  titleArea: {
    height: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextTitle: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold',
  },
  containerCadastro: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textRegister: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    width: '85%',
    height: 40,
    backgroundColor: '#DDD',
    borderRadius: 10,
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    position: 'relative',
  },
  inputViewer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    marginLeft: 10
    
  },
  btnUser:{
    justifyContent: "center",
    alignItems: "center",
    right: 30
  },
  centralizingViewer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textViewName: {
    color: '#6D1ED4',
    width: '85%',
  },
  TextLimit: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  viewSwitch: {
    flexDirection: 'row',
    marginTop: 25,
    height: 40,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ViewButton: {
    width: '85%',
    height: 60,
    backgroundColor: '#6D1ED4',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  titleDados: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    
  },
  dataArea: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '85%',
    marginTop: 10,
  },
  dataText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },

  modalContainer: {  
    marginTop: "40%",
    height: 380,
    backgroundColor: "#FFF",
    margin: 10,
    borderRadius: 30,
    
    
  },
  toggleCloseModal:{
    justifyContent: "center",
    alignItems: "flex-end",
    width: "90%",
    paddingTop: 20
  },
  containerCloseButton: {
    flex: 1 ,
    justifyContent: 'flex-end',
    alignItems: "center", 
    marginBottom: 10
  
  },
  CloseButton:{
    width: '85%',
    height: 60,
    backgroundColor: '#6A44CA',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
