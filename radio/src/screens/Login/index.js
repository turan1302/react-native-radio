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

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isSecure: true,
    };
  }

  _handleSubmit = (values, { resetForm, setSubmitting }) => {
    const { navigation } = this.props;

    RestClient.postRequest(AppUrl.login, values).then((res) => {
      const status = res.status;
      const result = res.data;

      if (status === 200) {

        let userData = {
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          url: result.data.url,
          channel: result.data.channel,
          access_token: result.data.access_token,
        };

        let appState = {
          isLoggedIn: true,
          user: userData,
        };

        this.props.AuthStore.saveToken(appState);
        setSubmitting(false);
        resetForm();
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: result.title,
          textBody: result.message,
          autoClose : 2000
        });
        setTimeout(() => {
          navigation.navigate("Welcome");
        }, 2000);

      } else {
        if (status === 422) {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: result.title,
            textBody: result.message,
            button : "Kapat",
            autoClose : 2000
          });
          setSubmitting(false);
        } else if (status === 401) {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: result.title,
            textBody: result.message,
            button : "Kapat",
            autoClose : 2000
          });
          setSubmitting(false);
        } else {
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

    }).catch((err) => {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: err,
        button : "Kapat",
        autoClose : 2000
      });
      setSubmitting(false);
    });
  };

  render() {
    const { isSecure } = this.state;
    const { navigation } = this.props;

    return (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.screen_title}>Giriş Yap</Text>
            <Text style={styles.screen_subtitle}>Hesabınıza giriş yapın</Text>
            <Formik initialValues={{
              email: "",
              password: "",
            }} validationSchema={Yup.object().shape({
              email: Yup.string().required("E-Mail alanı zorunludur").email("Lütfen geçerli bir E-Mail adresi giriniz"),
              password: Yup.string().required("Şifre alanı zorunludur").min(8, "Şifreniz minimum 8 karakter olmak zorundadır").max(16, "Şifreniz maksimum 16 karakter olmak zorundadır"),
            })} onSubmit={this._handleSubmit}>
              {({ touched, values, errors, handleChange, handleBlur, handleSubmit, isValid, isSubmitting }) => (
                <View>
                  <View style={styles.email_container}>
                    <TextInput keyboardType={"email-address"} value={values.email} onChangeText={handleChange("email")}
                               onBlur={handleBlur("email")} style={styles.email_input} placeholderTextColor={"#686f79"}
                               placeholder={"E-Mail Adresiniz..."} />
                    {(touched.email && errors.email) && <Text style={styles.error_text}>{errors.email}</Text>}
                  </View>
                  <View style={styles.password_container}>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput secureTextEntry={isSecure} value={values.password}
                                 onChangeText={handleChange("password")} onBlur={handleBlur("password")}
                                 style={styles.password_input} placeholderTextColor={"#686f79"}
                                 placeholder={"Şifreniz..."} />
                      <TouchableOpacity onPress={() => this.setState({ isSecure: !isSecure })}>
                        <Ionicons name={(isSecure) ? "eye-off" : "eye"} size={20} color={"gray"} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {(touched.password && errors.password) && <Text style={styles.error_text}>{errors.password}</Text>}

                  <View style={styles.button_container}>
                    <TouchableOpacity disabled={(!isValid || isSubmitting)} onPress={handleSubmit}
                                      style={styles.button}>
                      <Text style={styles.button_text}>Giriş Yap</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
            <View style={styles.form_footer_area}>
              <Text style={styles.footer_title}>Henüz hesabın yok mu ?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.footer_button_text}>Yeni hesap oluştur</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
    );
  }
}
