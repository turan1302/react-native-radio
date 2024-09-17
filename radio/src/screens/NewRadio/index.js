import React, { Component } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import AuthLayout from "../../components/Layout/AuthLayout";
import Select2 from "react-native-select-two";
import { inject, observer } from "mobx-react";
import { Formik } from "formik";
import * as Yup from "yup";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import styles from "./styles";
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from "react-native-alert-notification";


@inject("AuthStore")
@observer

export default class NewRadio extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      categories: [],
    };
  }

  _handleSubmit = async (values, { resetForm, setSubmitting, setFieldValue }) => {
    const { navigation } = this.props;

    await this.props.AuthStore.getAccessToken();
    const token = this.props.AuthStore.appState.user.access_token;

    RestClient.postRequest(AppUrl.set_radio, values, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const status = res.status;
      const result = res.data;

      if (status === 201) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: result.title,
          textBody: result.message,
          autoClose : 2000
        });
        resetForm();
        setSubmitting(false);
        setTimeout(() => {
          navigation.navigate("HomeNavigator");
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
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: result.title,
            textBody: result.message,
            button : "Kapat",
            autoClose : 2000
          });
          setSubmitting(false);
          this.props.AuthStore.removeToken();
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
      this.props.AuthStore.removeToken();
    });
  };

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.getCategories();
    });
  }

  getCategories = async () => {
    await this.props.AuthStore.getAccessToken();
    const token = this.props.AuthStore.appState.user.access_token;

    RestClient.getRequest(AppUrl.categories, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      const status = res.status;


      if (status === 200) {
        this.setState({
          isLoading: false,
          categories: result.data,
        });
      }

      if (status === 401) {
        this.props.AuthStore.removeToken();
      }

    }).catch((err) => {
      console.log(err);
      this.props.AuthStore.removeToken();
    });
  };

  render() {
    const { isLoading, categories } = this.state;

    const formattedData = categories.map(item => ({
      id: item.rc_id,
      name: item.rc_name,
    }));

    return (
       <AuthLayout>
         <Formik initialValues={{
           rd_name: "",
           rd_link: "",
           rd_category: "",
         }} validationSchema={Yup.object().shape({
           rd_name: Yup.string().required("Radyo Adı alanı gereklidir"),
           rd_link: Yup.string().required("Radyo Link alanı gereklidir"),
           rd_category: Yup.string().required("Radyo Kategori alanı gereklidir"),
         })} onSubmit={this._handleSubmit}>
           {({
               values,
               errors,
               touched,
               handleChange,
               handleBlur,
               handleSubmit,
               isValid,
               isSubmitting,
               setFieldValue,
               setFieldTouched,
             }) => (
             <View style={styles.container}>
               <ScrollView showsVerticalScrollIndicator={false}>
                 <View style={styles.form_container}>
                   {isLoading ? (
                     <ActivityIndicator size="large" color="#ccc" />
                   ) : (
                     <Select2
                       cancelButtonText="Vazgeç"
                       selectButtonText="Seç"
                       searchPlaceHolderText="Kategori Ara"
                       listEmptyTitle="Sonuç Bulunamadı"
                       isSelectSingle
                       style={styles.select2_style}
                       colorTheme="black"
                       popupTitle="Radyo Kategorileri"
                       title="Kategori Seç"
                       selectedTitleStyle={styles.select2_title_style}
                       data={formattedData}
                       onSelect={data => {
                         const selectedCategoryId = data[0]; // Seçilen kategori ID'sini al
                         const selectedCategory = categories.find(
                           item => item.rc_id === selectedCategoryId,
                         );

                         setFieldValue("rd_category", selectedCategory ? selectedCategory.rc_slug : "");
                         setFieldTouched("rd_category", true);
                       }}
                       onRemoveItem={() => {
                         setFieldValue("rd_category", "");
                         setFieldTouched("rd_category", true);
                       }}
                       selectedItems={values.rd_category ? [categories.find(item => item.rc_slug === values.rd_category)?.rc_id || ""] : []}
                     />
                   )}
                 </View>
                 {(touched.rd_category && errors.rd_category) &&
                   <Text style={styles.error_text}>{errors.rd_category}</Text>}


                 <View style={styles.rd_name_area}>
                   <TextInput value={values.rd_name} onChangeText={handleChange("rd_name")}
                              onBlur={handleBlur("rd_name")} style={styles.rd_name_input} placeholder={"Radyo Adı..."}
                              placeholderTextColor={"#686f79"} />
                 </View>
                 {(touched.rd_name && errors.rd_name) && <Text style={styles.error_text}>{errors.rd_name}</Text>}

                 <View style={styles.rd_link_area}>
                   <TextInput value={values.rd_link} onChangeText={handleChange("rd_link")}
                              onBlur={handleBlur("rd_link")} style={styles.rd_link_input} placeholder={"Radyo Linki..."}
                              placeholderTextColor={"#686f79"} />
                 </View>
                 {(touched.rd_link && errors.rd_link) && <Text style={styles.error_text}>{errors.rd_link}</Text>}

                 <TouchableOpacity disabled={(!isValid || isSubmitting)} onPress={handleSubmit} style={styles.rd_create_button}>
                   <Text style={styles.rd_create_button_text}>Radyo Ekle</Text>
                 </TouchableOpacity>
               </ScrollView>
             </View>
           )}
         </Formik>
       </AuthLayout>
    );
  }
}
