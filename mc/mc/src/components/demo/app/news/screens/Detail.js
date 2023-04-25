import { StyleSheet, Text, View, Image,ScrollView } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import { NewContext } from '../utilities/NewContext';
import AxiosInstance from '../../axiosClient/AxiosInstance';

const Detail = (props) => {
    const {navigation} = props;
    const {id} = props?.route?.params;
    const {getDetail} = useContext(NewContext);
    const [data, setData] = useState(null); //chi tiết tin tức
    const [isLoading, setisLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async()=>{
            const result = await getDetail(id);
            setData(result);
            setisLoading(false);
        };
        if(id){
            fetchData();
        }
        return ()=>{ }
    },[id])
    return (
        
       (id && data && data._id.toString()== id.toString()) ?
        <ScrollView style={DetailStyle.container}>
            <View
                style={DetailStyle.authorInformation}>
                <Image style={DetailStyle.iconBBC} source={require('../../../../../media/images/Ellipse.png')}
                resizeMode='cover' />
                <View style={DetailStyle.author}>
                    <Text style={DetailStyle.authorName}>BBC News</Text>
                    <Text style={DetailStyle.authorTime}>14 min ago</Text>
                </View>
            </View>
            <Image
                source={{uri:(data.image)}}
                style={DetailStyle.newImage}
                resizeMode='cover' />
                <Text style={DetailStyle.europe}>Europe</Text>
                <Text style={DetailStyle.title}>{data.title}</Text>
                <Text style={DetailStyle.content}>{data.content}</Text>
        </ScrollView>
    : <><View><Text>Loading...</Text></View></>
    )
}

export default Detail

const DetailStyle = StyleSheet.create({
    iconBBC:{
        width:50,
        height:50,
    },
    content:{
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 26,
        color: '#4E4B66',
        marginTop:16,
    },
    title:{
        fontWeight: '400',
        fontSize: 24,
        lineHeight: 36,
        color: '#000',
        marginTop:4,
    },
    europe:{
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 21,
        color: '#4E4B66',
        marginTop:16,
    },
    newImage:{
        width:'100%',
        height:240,
        marginTop:16,
        borderRadius:6
    },
    authorTime: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 21,
        color: '#4E4B66',
    },
    authorName: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24,
        color: '#000',
    },
    author: {
        marginLeft: 14
    },
    authorInformation: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#fff',
        padding: 24,
    }
})