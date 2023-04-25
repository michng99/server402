import { StyleSheet, Text, View, Image, TextInput, Pressable, Alert } from 'react-native'
import React, { useState, useCallback, useContext } from 'react'
import { NewContext } from '../utilities/NewContext'
//import { launchCamera,launchImageLibrary } from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera';



const Add = (props) => {
  const { navigation } = props;
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  let path = null;

  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  const {uploadImage, saveNews} = useContext(NewContext);

  //
 // Khởi tạo camera và kiểm tra quyền truy cập camera
 const initializeCamera = async () => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  setCameraPermission(status === 'granted');
};

// Khởi tạo quyền truy cập thư viện ảnh
const initializeGallery = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  setGalleryPermission(status === 'granted');
};

// Chụp ảnh từ camera
const takePicture = async () => {
 // if (camera) {
    const photo = await ImagePicker.launchCameraAsync();
    //
    const uriParts =photo.assets[0].uri.split('/');
    const fileName = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append('image', {
      uri: photo.assets[0].uri,
      type: 'image/jpeg',
      name: fileName
    });
    console.log("NAME Photo: ", photo.name);
    console.log("NAME Photo: ", fileName);
    const res = await uploadImage(formData); // upload ảnh lên server bằng hàm uploadImage
    console.log("RES : ",res);
    setImage(res.path); // lưu đường dẫn của ảnh vào biến imageUri
 // }
  //else{
   // Alert.alert(" không mở được");
 // }
};

// Chọn ảnh từ thư viện
const chooseImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });
  if (!result.canceled) {
    const uriParts =result.assets[0].uri.split('/');
    const fileName = uriParts[uriParts.length - 1];
    const formData = new FormData();
    formData.append('image', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: fileName
    });
    console.log("URI : ",result.assets[0].uri);
    console.log("Name : ",result.name);
    const res = await uploadImage(formData); // upload ảnh lên server bằng hàm uploadImage
    console.log("RES : ",res);
    path = res.path;
    setImage(path); // lưu đường dẫn của ảnh vào biến imageUri
  }
};



  // 
  const showImagePickerOptions = () => {
    Alert.alert(
      'Choose an option',
      '',
      [
        {
          text: 'Take photo',
          onPress: () => takePicture(),
        },
        {
          text: 'Choose from library',
          onPress: () => chooseImage(),
        },
      ],
      { cancelable: true }
    );
  };
  

  // const imageResult = async (result) => {
  //   if(!result) return;
  //   result = result.assets?.[0] ?? result; // sử dụng toán tử nullish coalescing
  //   // hoặc
  //   // result = result.assets && result.assets[0] || result; // sử dụng toán tử logic &&
  //   const formData = new FormData();
  //   formData.append('image', {
  //     uri: result.uri,
  //     type: result.type,
  //     name: result.fileName,
  //   });
  //   const res = await uploadImage(formData);
  //   console.log(res.path);
  //   setImage(res.path);
  // }

  // const handleChoosePhoto = useCallback(()=>{
  //   const options = {
  //     saveToPhotos: true,
  //     mediaType: 'photo',
  //     includeBase64: false,
  //     includeExtra: true,
  //   }
  //   ImagePicker.launchCameraAsync(options, imageResult);
  //   console.log(image+"");
  //   //launchCamera
    
  // },[]);

  const handleSubmit = useCallback(async() =>{
    const res = await saveNews(title, content, image,);
    if (res){
      Alert.alert("Succes");
      setContent('');
      setTitle('');
      setImage(null);
    } else{
      Alert.alert(" Not Succes");
    }
  },[title, content, image]);


  return (
    <View style={styles.container}>
      <View style={styles.titleNavigation}>
        <Text styles={styles.News}>Create News</Text>
      </View>

      {image ? 
      <Image source={{ uri: image }} style={styles.coverPhoto} /> 
      :
        <Pressable style={styles.coverPhoto}
        onPress={showImagePickerOptions}>
          <Image
            source={require('../../../../../media/images/plus.png')}
            style={styles.plus}>
          </Image>
          <Text style={styles.addCoverPhoto}>Add Cover Photo</Text>
        </Pressable>
      }
      <TextInput
        style={styles.title}
        placeholder="News title"
         value={title}
         onChangeText={setTitle}/>
      <TextInput />

      <TextInput
        style={styles.article}
        placeholder="Add News/Article"
        numberOfLines={10}
        multiline={true}
        value={content}
        onChangeText={setContent} />
      <TextInput />
      <Pressable style={styles.publish}
      onPress={handleSubmit}>
        <Text style={styles.buttonTitle}>Publish</Text>
      </Pressable>

    </View>
  )
}

export default Add

const styles = StyleSheet.create({
  titleNavigation: {
    backgroundColor: '#ffffff',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  News: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    marginTop: 20
  },
  buttonTitle: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#667080',
  },
  publish: {
    width: 109,
    height: 50,
    backgroundColor: '#eef1f4',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 13,
    paddingTop: 13,
    paddingLeft: 24,
    paddingRight: 24,
    gap: 10,
    position: 'absolute',
    bottom: 14,
    right: 24
  },
  article: {
    width: '100%',
    height: 24,
    marginTop: 16,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#A0A3BD',
  },
  title: {
    width: '100%',
    height: 36,
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 1,
    marginTop: 16,
    fontWeight: '400',
    fontSize: 24,
    lineHeight: 36,
    color: '#A0A3BD',
  },
  plus: {
    width: 24,
    height: 24,
    marginBottom: 20
  },
  addCoverPhoto: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    color: '4e4b66',
  },
  coverPhoto: {
    width: '100%',
    height: 183,
    backgroundColor: '#eef1f4',
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    position: 'relative'
  }
})