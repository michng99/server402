import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { NewContext } from '../utilities/NewContext';

//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//const Tab = createBottomTabNavigator();

const Home = (props) => {
    const { getNews } = useContext(NewContext);
    const [data, setData] = useState([]);
    const { navigation } = props;

    const [refreshing, setRefreshing] = useState(false);
    const refreshData = async () => {
        setRefreshing(true);
        const result = await getNews();
        setData(result);
        setRefreshing(false);
    }

    // useEffect(() =>{
    // tự động chạy sau khi component được render
    // chạy 1 lần duy nhất
    //});

    useEffect(() => {
        // tự động chạy sau khi component được render
        // chạy lần đầu tiên và mỗi khi có sự thay đổi State
        const get = async () => {
            const response = await getNews();
            setData(response);
        }
        get();
        return () => { }
    }, []);

    // useEffect(()=>{
    // tự động chạy sau khi component được render
    // chạy lần đầu tiên và mỗi khi có sự thay đổi State
    // State được khai báo trong mảng
    //},[data]);

    //adapter
    const renderItem = (props) => {
        const { item } = props;
        const { title, image, createdAt, _id } = item;

        const displayDate = (value) => {
            const date = new Date(value);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        return (
            <Pressable
                onPress={() => navigation.navigate('Detail', { id: _id })}
                style={HomeStyle.card} >
                <Image
                    style={HomeStyle.image}
                    source={{ uri: image }}
                />
                <View style={HomeStyle.information}>
                    <Text style={HomeStyle.category}>Europe</Text>
                    <Text style={HomeStyle.title}>{title}</Text>
                    <View style={HomeStyle.time}>
                        <Image style={HomeStyle.NhaDaiIcon}
                            source={require("../../../../../media/images/Ellipse.png")} />
                        <Text style={HomeStyle.NhaDaitxt}>BBC news</Text>
                        <Image style={HomeStyle.timeIcon}
                            source={require("../../../../../media/images/dongho.png")} />
                        <Text style={HomeStyle.timetxt}>{displayDate(createdAt)}</Text>
                    </View>
                </View>
            </Pressable>
        )
    }

    return (
        <View style={HomeStyle.container}>
            <Image style={HomeStyle.AppImg}
                source={require("../../../../../media/images/Vector.png")}>
            </Image>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                onRefresh={refreshData}
                refreshing={refreshing}
            />
        </View>
    )
}

export default Home

const HomeStyle = StyleSheet.create({
    timetxt: {
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 19.5,
        color: '#4E4B66',
    },
    timeIcon: {
        marginTop: 4.17,
        marginRight: 5.17,
        marginLeft: 9.17,
        width: 11.67,
        height: 11.67
    },
    NhaDaitxt: {
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 20,
        color: '#4E4B66',
    },
    NhaDaiIcon: {
        marginRight: 4,
        width: 20,
        height: 20
    },
    time: {
        justifyContent: 'flex-start',
        marginTop: 4,
        flexDirection: 'row',
    },
    AppImg: {
        width: 99,
        height: 30,
        marginBottom: 20
    },
    title: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        color: '#000',
    },
    category: {
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 20,
        color: '#4E4B66',
    },
    information: {
        flex: 1,
        height: 86,
    },
    image: {
        width: 86,
        height: 86,
        borderRadius: 6,
        marginRight: 4,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
    }
});
