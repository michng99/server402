import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'

const Screen1 = (props) => {
    const { navigation } = props;
  return (
    <View>
      <Text>Screen1</Text>
        <Button title='Chuyen man hinh'></Button>
    </View>
  )
}

export default Screen1

const styles = StyleSheet.create({})