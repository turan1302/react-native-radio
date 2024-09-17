import React, { Component } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import RestClient from "../../../RestAPI/RestClient";
import AppUrl from "../../../RestAPI/AppUrl";
import { inject, observer } from "mobx-react";

@inject("AuthStore")
@observer

export default class Filter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading : true,
      categories: [],
    }
  }

  async componentDidMount() {
    await this.getCategories();
  }

  getCategories = async ()=>{
    await this.props.AuthStore.getAccessToken();
    const token = this.props.AuthStore.appState.user.access_token;

    RestClient.getRequest(AppUrl.home,{
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res)=>{
      const result = res.data;
      const status = res.status;

      if (status===200){
        this.setState({
          isLoading : false,
          categories : result.data.radio_categories
        })
      }

      if (status===401){
        this.props.AuthStore.removeToken();
      }

    }).catch((err)=>{
      console.log(err);
      this.props.AuthStore.removeToken();
    });
  }

  render() {
    const {changeFilter,checkFilter} = this.props;
    const {isLoading,categories} = this.state;

    return (
      isLoading ? (<ActivityIndicator size={30}/>) : (<View style={styles.container}>
        <TouchableOpacity onPress={()=>changeFilter("tumu")}>
          <Text style={styles.button_text(checkFilter,"tumu")}>Tümü</Text>
          {(checkFilter==="tumu") && (<View style={styles.button_border}></View>)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>changeFilter("favori")}>
          <Text style={styles.button_text(checkFilter,"favori")}>Favori</Text>
          {(checkFilter==="favori") && (<View style={styles.button_border}></View>)}
        </TouchableOpacity>
        {categories.map((item,index)=>(
          <TouchableOpacity key={index} onPress={()=>changeFilter(item.rc_slug)}>
            <Text style={styles.button_text(checkFilter,item.rc_slug)}>{item.rc_name}</Text>
            {(checkFilter===item.rc_slug) && (<View style={styles.button_border}></View>)}
          </TouchableOpacity>
        ))}
      </View>)
    )
  }
}
