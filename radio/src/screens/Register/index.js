import React, { Component } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { inject } from "mobx-react";
import { observer } from "mobx-react/src";

import styles from "./styles";

import { Formik } from "formik";
import * as Yup from "yup";
import AppUrl from "../../RestAPI/AppUrl";
import RestClient from "../../RestAPI/RestClient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from "react-native-alert-notification";


@inject("AuthStore")
@observer

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isSecure : true,
      isSecureConfirm : true
    }
  }

  _handleSubmit = (values, { resetForm, setSubmitting }) => {
    const {navigation} = this.props;

    RestClient.postRequest(AppUrl.register,values).then((res)=>{
      const status = res.status;
      const result = res.data;

      if (status===201){
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: result.title,
          textBody: result.message,
          autoClose : 2000
        });
        resetForm();
        setSubmitting(false);
        setTimeout(()=>{
          navigation.navigate('Login');
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
    })
  };

  render() {
    const { isSecure,isSecureConfirm } = this.state;
    const {navigation} = this.props;

    return (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.screen_title}>Kayıt Ol</Text>
            <Text style={styles.screen_subtitle}>Yeni bir hesap oluşturun</Text>
            <Formik initialValues={{
              name: "",
              email: "",
              password: "",
              password_confirmation : ""
            }} validationSchema={Yup.object().shape({
              name: Yup.string().required("Ad Soyad alanı Zorunludur"),
              email: Yup.string().required("E-Mail alanı zorunludur").email("Lütfen geçerli bir E-Mail adresi giriniz"),
              password: Yup.string().required("Şifre alanı zorunludur").min(8, "Şifreniz minimum 8 karakter olmak zorundadır").max(16, "Şifreniz maksimum 16 karakter olmak zorundadır"),
              password_confirmation: Yup.string().required("Şifre Tekrarı alanı Zorunludur").min(8, "Şifre Tekrar alanı 8 karakterden az olamaz").max(16, "Şifre tekrar alanı 16 karakterden fazla olamaz").oneOf([Yup.ref('password'), null], "Şifreler eşleşmiyor")
            })} onSubmit={this._handleSubmit}>
              {({touched,values,errors,handleChange,handleBlur,handleSubmit,isValid,isSubmitting})=>(
                <View>
                  <View style={styles.name_container}>
                    <TextInput value={values.name} onChangeText={handleChange('name')} onBlur={handleBlur('name')} style={styles.name_input} placeholderTextColor={"#686f79"}
                               placeholder={"Adınız Soyadınız..."} />
                    {(touched.name && errors.name) && <Text style={styles.error_text}>{errors.name}</Text>}
                  </View>
                  <View style={styles.email_container}>
                    <TextInput keyboardType={"email-address"} value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} style={styles.email_input} placeholderTextColor={"#686f79"}
                               placeholder={"E-Mail Adresiniz..."} />
                    {(touched.email && errors.email) && <Text style={styles.error_text}>{errors.email}</Text>}
                  </View>
                  <View style={styles.password_container}>
                    <View style={{flexDirection : "row"}}>
                      <TextInput secureTextEntry={isSecure} value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} style={styles.password_input} placeholderTextColor={"#686f79"}
                                 placeholder={"Şifreniz..."} />
                      <TouchableOpacity onPress={()=>this.setState({isSecure : !isSecure})}>
                        <Ionicons name={(isSecure) ? "eye-off" : "eye"} size={20} color={"gray"}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {(touched.password && errors.password) && <Text style={styles.error_text}>{errors.password}</Text>}

                  <View style={styles.password_confirmation_container}>
                    <View style={{flexDirection : "row"}}>
                      <TextInput secureTextEntry={isSecureConfirm} value={values.password_confirmation} onChangeText={handleChange('password_confirmation')} onBlur={handleBlur('password_confirmation')} style={styles.password_confirmation_input} placeholderTextColor={"#686f79"}
                                 placeholder={"Şifre Tekrar..."} />
                      <TouchableOpacity onPress={()=>this.setState({isSecureConfirm : !isSecureConfirm})}>
                        <Ionicons name={(isSecureConfirm) ? "eye-off" : "eye"} size={20} color={"gray"}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {(touched.password_confirmation && errors.password_confirmation) && <Text style={styles.error_text}>{errors.password_confirmation}</Text>}

                  <View style={styles.button_container}>
                    <TouchableOpacity disabled={(!isValid || isSubmitting)} onPress={handleSubmit} style={styles.button}>
                      <Text style={styles.button_text}>Kayıt Ol</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
            <View style={styles.form_footer_area}>
              <Text style={styles.footer_title}>Zaten üye misin ?</Text>
              <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                <Text style={styles.footer_button_text}>Giriş Yap</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
    );
  }
}
