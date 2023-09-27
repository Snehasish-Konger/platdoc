import React from 'react'
import {View,Text,ImageBackground,TouchableOpacity,Image, ScrollView, TextInput} from 'react-native'
import CourseList from '../screens/CourseList'
import {FONTS, COLORS, SIZES} from '../constants'

const ExpertHome = ({navigation}) => {
        return(
           <ImageBackground
            source={require('../assets/images/Home.png')}
            style={{width:"100%",height:"100%", position:"absolute"}}
           >
               <ScrollView>
                   <View style={{
                       width:"100%",
                       alignItems:"flex-end",
                       paddingHorizontal:20,
                       marginTop: SIZES.padding * 1.1,
                   }}>
                       <View style={{
                           paddingHorizontal:10,
                           paddingVertical:12,
                           borderRadius:10,
                           marginTop:30,
                           backgroundColor: COLORS.lightBlue
                       }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                           <Image
                            source={require('../assets/images/hum.png')}
                            style={{height:15,width:20}}
                           />
                        </TouchableOpacity>
                       </View>
                   </View>
                   <Text style={{
                       paddingHorizontal:20,
                       fontSize:35,
                       paddingTop:40,
                       color:"#FFF"
                   }}>
                       Welcome back :)
                   </Text>

                   <View style={{
                       flexDirection:"row",
                       alignItems:"center",
                       backgroundColor:"#FFF",
                       padding:10,
                       borderRadius:12,
                       marginHorizontal:20,
                       marginTop:20
                   }}>
                       <TextInput
                            placeholder="Search for new knowledge!"
                            placeholderTextColor="#345c74"
                            style={{
                                fontSize:12,
                                width:280,
                                paddingHorizontal:12
                            }}
                       />
                       <Image
                            source={require('../assets/images/sear.png')}
                            style={{height:14,width:14, marginLeft:100}}
                       />
                   </View>
                   <View style={{
                       flexDirection:"row",
                       backgroundColor:COLORS.lightBlue,
                       marginTop:15,
                       marginHorizontal:20,
                       borderRadius:20,
                       paddingVertical:30,
                       paddingLeft:30
                   }}>
                       <View>
                           <Text style={{
                               color:"#345c74",
                               fontSize:20,
                               width:250,
                               paddingRight:100 
                           }}>
                               Start learning new Staff
                           </Text>
                           <TouchableOpacity
                                onPress={()=> navigation.navigate('Cources')}
                                style={{
                                    flexDirection:"row",
                                    backgroundColor:"#f58084",
                                    alignItems:"center",
                                    marginTop:20,
                                    width:150,
                                    paddingVertical:10,
                                    borderRadius:14,
                                    paddingHorizontal:10
                                }}
                           >
                                    <Text style={{
                                        color:"#FFF",
                                        fontSize:12
                                    }}>Categories</Text>  
                                    <Image
                                        source={require('../assets/images/a3.png')}
                                        style={{marginLeft:20,width:8,height:8}}
                                    />
                           </TouchableOpacity>
                       </View>
                       <Image
                            source={require('../assets/images/undraw.png')}
                            style={{marginLeft: -SIZES.padding*3.5,marginTop: -SIZES.padding*1.5, width:200,height:200}}
                       />

                   </View>
                   <Text style={{
                       color:"#345c74",
                       fontSize:20,
                       paddingHorizontal:20,
                       marginTop: SIZES.padding * 3,
                       marginBottom:10
                   }}>Recent News</Text>

                   <CourseList
                        img={require('../assets/images/xd.png')}
                        title="Making agriculture aspirational"
                        desc ='sustainable for small and marginal farmers in Central Indian Tribal Region'
                        time="2 hours ago"
                        bg="#fdddf3"
                   />
                    <CourseList
                        img={require('../assets/images/sketch.png')}
                        title="Agriculture and Food Engineering"
                        desc ='sustainable for small and marginal farmers in Central Indian Tribal Region'
                        time="1 day ago"                        
                        bg="#fef8e3"
                   />
                    <CourseList
                        img={require('../assets/images/ae.png')}
                        title="Climate Change and Agriculture"
                        desc ="Climate change is one of the biggest challenges facing the world today."
                        time="15 hours ago"
                        bg="#fcf2ff"
                   />
               </ScrollView>
           </ImageBackground>
        )
}
export default ExpertHome;