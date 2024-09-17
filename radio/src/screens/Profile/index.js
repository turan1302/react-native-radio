import React, { Component } from 'react'
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import AuthLayout from "../../components/Layout/AuthLayout";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as  Yup from "yup";
import { inject, observer } from "mobx-react";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import styles from "./styles";

import { ALERT_TYPE, Dialog, AlertNotificationRoot } from "react-native-alert-notification";

@inject("AuthStore")
@observer

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading : false,
      isSecure : true,
      isConfirmSecure : true,

      user : {},
    }
  }

   componentDidMount() {
    const {navigation} = this.props;

     this.getUserInfo();

    navigation.addListener("focus",async ()=>{
      await this.getUserInfo();
    });

     navigation.addListener("blur",async ()=>{
       this.setState({
         user : {}
       });
     });
  }

  getUserInfo = async ()=>{
    await this.props.AuthStore.getAccessToken();
    const token = this.props.AuthStore.appState.user.access_token;

    RestClient.getRequest(AppUrl.profile,{
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res)=>{

      const result = res.data;
      const status = res.status;


      if (status === 200) {
        this.setState({
          user : result.data.user
        });
      }

      if (status === 401) {
        this.props.AuthStore.removeToken();
      }

    }).catch((err)=>{
      console.log(err);
      this.props.AuthStore.removeToken();
    })
  }

  _handleSubmit = async (values,{resetForm,setSubmitting})=>{
    await this.props.AuthStore.getAccessToken();
    const token = this.props.AuthStore.appState.user.access_token;

    RestClient.postRequest(AppUrl.update_profile, values, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res)=>{
      const result = res.data;
      const status = res.status;

      if (status===200){
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: result.title,
          textBody: result.message,
          autoClose : 2000
        });
        setSubmitting(false);
        setTimeout(()=>{
          this.props.AuthStore.removeToken();
        },2000);
      }else{
        if (status===422){
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: result.title,
            textBody: result.message,
            button : "Kapat",
            autoClose : 2000
          });
          setSubmitting(false);
        }else{
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: result.title,
            textBody: result.message,
            button : "Kapat",
            autoClose : 2000
          });
          setSubmitting(false);
        }
      }

    }).catch((err)=>{
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: err,
        button : "Kapat",
        autoClose : 2000
      });
      setSubmitting(false);
      setTimeout(()=>{
        this.props.AuthStore.removeToken();
      },2000);
    })
  }

  render() {
    const {isLoading,isSecure,isConfirmSecure,user} = this.state;


    return (
       <AuthLayout>
         <View style={styles.container}>
           <ScrollView showsVerticalScrollIndicator={false}>
             {isLoading ? (
               <ActivityIndicator size="large" color="#ccc" />
             ) : (
               <Formik enableReinitialize={true} initialValues={{
                 name : user.name,
                 email : user.email,
                 password : '',
                 password_confirmation : ''
               }}
                       validationSchema={Yup.object().shape({
                         name: Yup.string().required("Ad Soyad alanı Zorunludur"),
                         email: Yup.string().required("E-Mail alanı zorunludur").email("Lütfen geçerli bir E-Mail adresi giriniz"),
                         password: Yup.string().min(8, "Şifreniz minimum 8 karakter olmak zorundadır").max(16, "Şifreniz maksimum 16 karakter olmak zorundadır"),
                         password_confirmation: Yup.string().min(8, "Şifre Tekrar alanı 8 karakterden az olamaz").max(16, "Şifre tekrar alanı 16 karakterden fazla olamaz").oneOf([Yup.ref('password'), null], "Şifreler eşleşmiyor")
                       })}
                       onSubmit={this._handleSubmit}>
                 {({values,touched,errors,handleChange,handleBlur,handleSubmit,isValid,isSubmitting})=>(
                   <View>
                     <View style={styles.name_area}>
                       <TextInput value={values.name} onChangeText={handleChange('name')} onBlur={handleBlur('name')} placeholder={"Adınız Soyadınız..."}
                                  placeholderTextColor={"#686f79"} style={styles.input_style}/>
                     </View>
                     {(errors.name && touched.name) && <Text style={styles.error_text}>{errors.name}</Text>}

                     <View style={styles.email_area}>
                       <TextInput value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} placeholder={"E-Mail Adresiniz..."}
                                  placeholderTextColor={"#686f79"} style={styles.input_style}/>
                     </View>
                     {(errors.email && touched.email) && <Text style={styles.error_text}>{errors.email}</Text>}

                     <View style={styles.password_area}>
                       <TextInput value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} secureTextEntry={isSecure} placeholder={"Şifreniz..."}
                                  placeholderTextColor={"#686f79"} style={styles.input_style}/>
                       <TouchableOpacity onPress={()=>this.setState({isSecure : !isSecure})}>
                         <Ionicons color={"#686f79"} size={20} name={isSecure ? "eye-off" : "eye"} style={{marginRight : 10}}/>
                       </TouchableOpacity>
                     </View>
                     {(errors.password && touched.password) && <Text style={styles.error_text}>{errors.password}</Text>}

                     <View style={styles.password_confirmation_area}>
                       <TextInput value={values.password_confirmation} onChangeText={handleChange('password_confirmation')} onBlur={handleBlur('password_confirmation')} secureTextEntry={isConfirmSecure} placeholder={"Şifreniz (Tekrar)..."}
                                  placeholderTextColor={"#686f79"} style={styles.input_style}/>
                       <TouchableOpacity onPress={()=>this.setState({isConfirmSecure : !isConfirmSecure})}>
                         <Ionicons color={"#686f79"} size={20} name={isConfirmSecure ? "eye-off" : "eye"} style={{marginRight : 10}}/>
                       </TouchableOpacity>
                     </View>
                     {(errors.password_confirmation && touched.password_confirmation) && <Text style={styles.error_text}>{errors.password_confirmation}</Text>}

                     <TouchableOpacity disabled={(!isValid || isSubmitting)} onPress={handleSubmit} style={styles.button_style}>
                       <Text style={styles.button_text}>Güncelle</Text>
                     </TouchableOpacity>
                   </View>
                 )}
               </Formik>
             )}
           </ScrollView>
         </View>
       </AuthLayout>
    )
  }
}
