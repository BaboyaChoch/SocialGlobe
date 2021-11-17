import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Pressable,
  Marker,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

export default function UseModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Marker coordinate={props.coordinate} onPress={() => setModalVisible(true)}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPressOut={() => {
              setModalVisible(!modalVisible);
            }}>
            <ScrollView
              directionalLockEnabled={true}
              contentContainerStyle={styles.scrollModal}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Title: {props.title}</Text>
                  <Text style={styles.modalText}>
                    Description: {props.description}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.modalButtonAlignLeft,
                      {backgroundColor: 'white'},
                    ]}
                    onPress={() => {
                      alert();
                    }}>
                    <Image
                      style={{width: 25, height: 25}}
                      source={{
                        uri: 'https://i.ibb.co/60FsSPZ/001-plus.png',
                      }}
                    />
                  </TouchableOpacity>
                  <Pressable
                    style={[
                      styles.button,
                      styles.modalButtonAlignMiddle,
                      {backgroundColor: 'black'},
                    ]}
                    onPress={() => alert()}>
                    <Text style={styles.textStyle}>name</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.button,
                      styles.modalButtonAlignRight,
                      {backgroundColor: '#47D13B'},
                    ]}
                    onPress={() => alert()}>
                    <Text style={styles.textStyle}>Go</Text>
                  </Pressable>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </TouchableOpacity>
        </Modal>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtonAlignLeft: {
    position: 'absolute',
    top: '99%',
    alignSelf: 'flex-start',
    marginTop: 25,
  },
  modalButtonAlignMiddle: {
    position: 'absolute',
    top: '99%',
    alignSelf: 'center',
    marginTop: 25,
  },
  modalButtonAlignRight: {
    position: 'absolute',
    top: '99%',
    alignSelf: 'flex-end',
    marginTop: 25,
  },
});
