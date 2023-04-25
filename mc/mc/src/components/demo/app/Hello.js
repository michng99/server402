import { StyleSheet,View, Text,TextInput, Button } from 'react-native'
import React,{useState} from 'react'

const Hello = () => {
    const [number1,setnumber1] = useState("");
    const [number2,setnumber2] = useState("");
    const [kq,setkq] = useState("");
    const [thongbao,setthongbao] = useState("Kết quả: ");

    const xoso = ()=>{
        //tạo số ngẫu nhiên
        const random = Math.floor(Math.random()*100);
        setnumber2(random);
        if(random === number1){
            setkq("Kết quả: "+ random);   
            setthongbao("Bạn đã trúng giải !");     
        }
        else{
            setkq("Kết quả: "+ random);
            setthongbao("Chúc bạn may mắn lần sau!");
        }
    }

  return (
    <View style = {style.container}>
      <Text style = {style.hoten}>Nguyễn Thanh Tùng - PS2184</Text>
      <Text style = {style.title}>Chương trình xổ số 1 ăn 70</Text>
      <TextInput style = {style.input}
      placeholder='Nhập số bạn muốn!'
      value={number1}
      onChangeText={text => setnumber1(text)}>
        
      </TextInput>
      <Button
      title='Xổ số'
      onPress={xoso}></Button>
      <Text>{kq}</Text>
      <Text>{thongbao}</Text>
    </View>
  )
}

export default Hello
const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hoten:{
    fontSize:13,
    color: 'red',
    fontStyle: 'italic' 

  },
  title:{
    fontSize:18,
    color: 'green',
  },

  input:{
    textAlign:'center',
    borderRadius:10,
    padding:10,
    marginTop:10,
    marginBottom:10
    
  }
})