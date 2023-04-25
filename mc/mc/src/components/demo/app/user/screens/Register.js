import { StyleSheet, Text, View, Image, TextInput, Pressable, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '../utilities/UserContext';

const Register = (props) => {
  const { navigation } = props;
  const { Register } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password||!confirmpassword) {
      Alert.alert("Please enter your email and password");
      return;
    }
    if(password!== confirmpassword){
      Alert.alert('Password and confirm password must be the same');
      return;
    }
    const result = await Register(email, password);
    console.log('Đăng ký: ',result);
    if(result){
      navigation.navigate('Login');
    }else{
      Alert.alert("Đăng ký không thành công!");
    }
  }
  return (
    <View style={Loginstyles.container}>
      <Text style={Loginstyles.hello}>Hello</Text>
      <Text style={Loginstyles.again}>Again!</Text>
      <Text style={Loginstyles.welcome}>Welcome back you've been missed</Text>

      <View style={Loginstyles.inputContainer}>
        <Text style={Loginstyles.label}>Username*</Text>
        <TextInput style={Loginstyles.input}
          value={email}
          onChangeText={setEmail} />
      </View>

      <View style={Loginstyles.inputContainer}>
        <Text style={Loginstyles.label}>Password*</Text>
        <TextInput style={Loginstyles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword} />
        <Image
          source={require('../../../../../media/images/Icon.png')}
          style={Loginstyles.eyeicon}
        />
      </View>
      <View style={Loginstyles.inputContainer}>
        <Text style={Loginstyles.label}>Confirm Password*</Text>
        <TextInput style={Loginstyles.input}
          secureTextEntry
          value={confirmpassword}
          onChangeText={setConfirmPassword} />
        <Image
          source={require('../../../../../media/images/Icon.png')}
          style={Loginstyles.eyeicon}
        />
      </View>
      <Pressable style={Loginstyles.buttonContainer}
      onPress = {handleRegister}>
        <Text style={Loginstyles.buttonLoginLabel}>Register</Text>
      </Pressable>

      <View style={Loginstyles.accout}>
        <Text style={Loginstyles.accoutLabel}>already having an account?</Text>
        <Pressable
          onPress={() => navigation.goBack()}>
          <Text style={Loginstyles.SignupLabel}>Login</Text>
        </Pressable>

      </View>
    </View>
  )
}

export default Register

const Loginstyles = StyleSheet.create({
  SignupLabel: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    color: '#1877F2',

  },
  accoutLabel: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    color: '#667080',
  },
  accout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,

  },
  buttonLoginLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF'
  },
  buttonContainer: {
    paddingVertical: 13,
    paddingHorizontal: 24,
    width: '100%',
    height: 50,
    backgroundColor: '#1877F2',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeicon: {
    position: 'absolute',
    width: 21.64,
    height: 21.21,
    top: 37,
    right: 10,
  },
  inputContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  label: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    marginBottom: 4,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#4E4B66',
    borderRadius: 6,
    padding: 10,
  },
  welcome: {
    fontfamily: 'Poppins',
    color: '#4E4B66',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 0.12,
    width: 222,
    marginTop: 4,
    marginBottom: 48,
    fontStyle: 'normal',
  },
  again: {
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 72,
    fontSize: 48,
    letterSpacing: 0.12,
    color: '#1877F2',
  },
  container: {
    flex: 1,
    backgroundColor: 'f###',
    padding: 24,
  },
  hello: {
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 72,
    fontSize: 48,
    letterSpacing: 0.12,
    color: '#050505',
  },
})