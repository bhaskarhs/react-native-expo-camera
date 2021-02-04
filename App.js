// import React ,{useState,useEffect} from 'react'
// import { View, Text } from 'react-native'
// import {Camera} from 'expo-camera'

// const App = () => {

//   const [status,setStatus] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
 


//   useEffect(() => {
//     (async() => {
//       const {status} = await Camera.getPermissionsAsync();
//       setStatus(status === 'granted');
//     })();
//   },[])



//   return (
//     <View>
//       <Text>to record the video</Text>
//       <Camera style={styles.camera} type={type}>

//        </Camera>
        
//     </View>
//   )
// }

// export default App

import React from 'react'
import Copied from './Copied'
import Videorecord from './Videorecord'

export default function App() {
  return(
    <>
    <Videorecord/>
      {/* <Copied/> */}
    </>
  )
}