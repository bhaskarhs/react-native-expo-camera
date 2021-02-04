import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Button, ScrollView} from 'react-native';
import { Camera,Constants } from 'expo-camera';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


export default function Copied() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash,setFlash] = useState(Camera.Constants.FlashMode.off);
  const [focus,setFocus] = useState(Camera.Constants.AutoFocus.on);
  const [whBalance ,setWhBalance] = useState('');
  const [camera, setCamera] = useState(null);
  const [focusDepth,setfocusDepth] = useState(0)

  // to set the white balance to the photos 
   const WhiteBalanceprops = [
     {id:'auto' , property :'auto'},
     {id:'sunny' , property :'sunny'},
     {id:'cloudy', property:'cloudy'},
     {id:'shadow', property:'shadow'},
     {id:'fluorescent', property:'fluorescent'},
     {id:'incandescent', property:'incandescent'},
   ]


  const takepicture = async() =>{
   const options = {quality :0.5,base64:true,skipProcessing:false,  allowsEditing: true,aspect: [16, 9],}

    if(camera) {
      const picturesource = await camera.takePictureAsync([options,{ratio:[1,1]}]) 
      handleSave(picturesource.uri)
      console.log( 'picture', picturesource.uri);
    }else{
      console.log("fialed to take picute");
    }

  }
  // to save the picture in device 
  const handleSave = async(source) => {
    try{
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(status === 'granted'){
      const createFolder = await MediaLibrary.createAssetAsync(source);
      MediaLibrary.createAlbumAsync('expo' , createFolder)
      
    }else{
      console.log("fialed to save picute");
    }
    }catch(error){
      console.log(error);
    }
    
  }

  // whitebalance to the picture

  const handlewhiteBlance = (value) => {
    console.log(value);
    // const setValue = `Camera.Constants.WhiteBalance.${value}`
    // setWhBalance(setValue);
    setWhBalance(`Camera.Constants.WhiteBalance.${value}`)
    console.log(whBalance);

  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // console.log(whBalance);
  
  return (

    <View style={{flex:1}}>
      <Camera 
  
      style={styles.camera}
       ref={ref => setCamera(ref)} 
       type={type} 
       flashMode = {flash}
       autoFocus={focus} 
       whiteBalance={whBalance}
       focusDepth={1}
       >
       
      </Camera>
      
      <View>
      <View style={styles.buttonContainer}>
        
        {/* flash */}
        <View>
          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}> 
                <MaterialCommunityIcons name="rotate-3d-variant" size={30} color="black" />
          </TouchableOpacity>
        </View>
          {/* this is capture of pic */}
        <View >        
            <TouchableOpacity onPress={() => takepicture()} >
               <Ionicons name="ios-aperture" size={46} color="black"/>
            </TouchableOpacity>
        </View>
          {/* flash */}
          <View>
             <TouchableOpacity 
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off 
                  ? Camera.Constants.FlashMode.on 
                  : Camera.Constants.FlashMode.off     
                )
                }}>
              <MaterialCommunityIcons name={ flash === Camera.Constants.FlashMode.off ? 'flash-off' : 'flash'} size={30} color="black" />

            </TouchableOpacity>
          </View>
            
         
        </View>
       
       {/* <View> */}
         {/* focus */}
          {/* <TouchableOpacity 
            onPress={() => {
              setFocus(
                focus === Camera.Constants.AutoFocus.on
                ? Camera.Constants.AutoFocus.off
                :Camera.Constants.AutoFocus.on
              
              )
              // console.log();
            }}>
 
              <Text>focus on and off</Text>

            </TouchableOpacity> */}

          {/* zoom */}
        {/* </View> */}
        <ScrollView 
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
          {WhiteBalanceprops.map((items) => {
            return(
              <TouchableOpacity key={items.id} onPress={() => handlewhiteBlance(items.property) } style={{flexDirection:'row',padding:10, justifyContent:'space-around'}}>
                  <View><Text>{items.property}</Text></View>
              </TouchableOpacity>
            )

          })}
        </ScrollView>
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
     camera:{
       width:'100%',
       height:'85%',
     },
     buttonContainer:{
      marginTop:10,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around'
     },
     button:{
      //  backgroundColor:'blue',
      //  position:'absolute',
      //  top:450,
      //  right:30,
     }
})