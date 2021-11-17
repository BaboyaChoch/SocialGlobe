import React, {useState, useRef, useEffect} from 'react';
export default function EventDetails({}) {
  return (
    <View style={{flexDirection: 'column'}}>
      <View style={styles.rowStyle}>
        <View style={{flexDirection: 'row', margin: 15}}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              setEventPictures([...eventPictures, {title: 'test'}]);
            }}>
            <Text>Upload</Text>
          </TouchableOpacity>
          <View
            style={{
              width: '80%',
              borderWidth: 1,
              borderColor: 'gray',
              flexDirection: 'row',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {eventPictures.map((file, index) => (
              <FileCard cardTitle={index} fileName={file.title} />
            ))}
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 15}}>
        <TouchableOpacity style={styles.buttonStyle} onPress={createEvent}>
          <Text>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
