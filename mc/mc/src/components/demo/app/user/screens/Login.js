import { StyleSheet, Text, View, Image, TextInput, Pressable, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '../utilities/UserContext';

const Login = (props) => {
  const { navigation } = props;
  const { Login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = async ()=>{
    if(!email||!password){
      Alert.alert("Please enter your email and password");
    }
    const result = await Login(email,password);
    console.log(result);
    if(!result){
      setEmail('');
      setPassword('');
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
      <Pressable style={Loginstyles.buttonContainer}
      onPress={handleLogin}>
        <Text style={Loginstyles.buttonLoginLabel}>Login</Text>
      </Pressable>

      <View style={Loginstyles.continue}>
        <Text>or continue with</Text>
      </View>

      <View style={Loginstyles.socialContainer}>
        <Pressable style={Loginstyles.buttonFBGG}>
          <Image source={require('../../../../../media/images/FB.png')}
            style={Loginstyles.FBGGicon} />
          <Text style={Loginstyles.FBGGLabel}>Facebook</Text>
        </Pressable>

        <Pressable style={Loginstyles.buttonFBGG}>
          <Image source={require('../../../../../media/images/GG.png')}
            style={Loginstyles.FBGGicon} />
          <Text style={Loginstyles.FBGGLabel}>Google</Text>
        </Pressable>
      </View>
      <View style={Loginstyles.accout}>
        <Text style={Loginstyles.accoutLabel}>don't have a account ?</Text>
        <Pressable
          onPress={() => navigation.navigate('Register')}>
          <Text style={Loginstyles.SignupLabel}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Login

const Loginstyles = StyleSheet.create({
  FBGGicon: {
    width: 25,
    height: 25,
  },
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
  FBGGLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#667080',
    letterSpacing: 0.12,
    marginLeft: 10,
  },
  buttonFBGG: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
    height: 48,
    backgroundColor: '#EEF1F4',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '47%',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  continue: {
    alignItems: 'center',
    justifyContent: 'center',
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