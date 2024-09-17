import React, { Component } from "react";
import { ActivityIndicator, Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import Filter from "../../components/Home/Filter";
import Player from "../../components/Player";
import AuthLayout from "../../components/Layout/AuthLayout";
import { inject, observer } from "mobx-react";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import ListItem from "../../components/Home/RadioList/ListItem";
import styles from "./styles";
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from "react-native-alert-notification";


@inject("AuthStore")
@observer

export default class Home extends Component {

  constructor(props) {
    super(props);


    this.state = {
      checkFilter: "tumu",
      radios: [],
      filterRadios: [],
      isLoading: true,

    };
  }

  async componentDidMount() {

    this.getRadios();

    const { navigation } = this.props;

    navigation.addListener("focus", async () => {
      await this.props.AuthStore.getAccessToken();
      const { user } = (this.props.AuthStore.appState !== null) ? this.props.AuthStore.appState : {};

      this.setState({
        playUrl: user.url,
        playChannel: user.channel,
      }, async () => {
        await this.getRadios();
      });
    });


  }

  getRadios = async () => {
    await this.props.AuthStore.getAccessToken();
    const token = this.props.AuthStore.appState.user.access_token;

    RestClient.getRequest(AppUrl.home, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      const status = res.status;

      if (status === 200) {
        this.setState({
          isLoading: false,
          radios: result.data.radios,
          filterRadios: result.data.radios,
        });
      }

      if (status === 401) {
        this.props.AuthStore.removeToken();
      }

      if (status === 500) {
        this.props.AuthStore.removeToken();
      }

    }).catch((err) => {
      console.log(err);
      this.props.AuthStore.removeToken();
    });
  };

  onPlayRadio = async (url, channel) => {
    const { navigate } = this.props;
    await this.props.AuthStore.getAccessToken();

    const token = this.props.AuthStore.appState.user.access_token;

    RestClient.postRequest(AppUrl.update, {
      url: url,
      channel: channel,
    }, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;

      if (result.success === false) {
        this.props.AuthStore.removeToken();
      } else {

        let userData = {
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          url: result.data.url,
          channel: result.data.channel,
          access_token: result.data.access_token,
        };

        let appState = {
          "isLoggedIn": true,
          "user": userData,
        };

        this.setState({
          playChannel: channel,
          playUrl: url,
        }, () => {
          this.props.AuthStore.saveToken(appState);
        });
      }
    }).catch((err) => {
      console.log(err);
      this.props.AuthStore.removeToken();
    });
  };

  changeFilter = (filter) => {
    this.setState({
      checkFilter: filter,
    }, () => {
      if (filter === "tumu") {

        let allFilter = this.state.radios;
        this.setState({
          filterRadios: allFilter,
        });

      } else if (filter === "favori") {

        let favoriFilter = this.state.radios;
        let newFavoriFilter = favoriFilter.filter(item => {
          return item.isFavourite === true;
        });

        this.setState({
          filterRadios: newFavoriFilter,
        });
      } else {

        let categoryFilter = this.state.radios;
        let newCategoryFilter = categoryFilter.filter((item, index) => {
          return item.rd_category === filter;
        });

        this.setState({
          filterRadios: newCategoryFilter,
        });

      }
    });
  };

  favourite = (id) => {
    const { radios, filterRadios } = this.state;

    let newRadios = radios.map((item) => {
      return (item.rd_id === id) ? { ...item, isFavourite: !item.isFavourite } : item;
    });

    let newFilterRadios = filterRadios.map((item) => {
      return (item.rd_id === id) ? { ...item, isFavourite: !item.isFavourite } : item;
    });

    this.setState({
      radios: newRadios,
      filterRadios: newFilterRadios,
    }, () => {
      this.setFavourite(id);
    });
  };

  setFavourite = async (id) => {
    await this.props.AuthStore.getAccessToken();
    const token = this.props.AuthStore.appState.user.access_token;

    RestClient.postRequest(AppUrl.set_favourite, {
      fw_radio: id,
    }, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
    }).catch((err) => {
      console.log(err);
      this.props.AuthStore.removeToken();
    });
  };

  onRemoveAlert = (id) => {
    Alert.alert("Dikkat", "Radyo Silinecektir. Onaylıyor Musunuz ?", [
      { text: "Evet", onPress: () => this.removeRadio(id) },
      {
        text: "Hayır",
      },
    ]);
  };

  removeRadio = async (id) => {
    await this.props.AuthStore.getAccessToken();
    const token = this.props.AuthStore.appState.user.access_token;

    await RestClient.postRequest(AppUrl.remove_radio, {
      rd_id: id,
    }, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const status = res.status;
      const result = res.data;

      if (status === 200) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: result.title,
          textBody: result.message,
          button : "Tamam",
          autoClose : 2000
        });
          this.getRadios();
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
    const { checkFilter, radios, filterRadios, isLoading, playChannel, playUrl } = this.state;

    return (
        <AuthLayout>
          <View style={styles.container}>
            {isLoading ? (<ActivityIndicator size={20} />) : (<>
              <View style={styles.search_area}>
                <TextInput
                  onChangeText={e => {

                    let data = e.length === 0
                      ? radios.filter(item => {
                        if (checkFilter === "favori") {
                          return item.isFavourite === 1;
                        } else if (checkFilter === "tumu") {
                          return true;
                        } else {
                          return checkFilter === item.rd_category;
                        }
                      })
                      : radios.filter(item => {
                        if (checkFilter === "favori") {
                          return item.isFavourite === 1 && item.rd_name.toLowerCase().includes(e.toLowerCase());
                        } else if (checkFilter === "tumu") {
                          return item.rd_name.toLowerCase().includes(e.toLowerCase());
                        } else {
                          return checkFilter === item.rd_category && item.rd_name.toLowerCase().includes(e.toLowerCase());
                        }
                      });


                    this.setState({
                      filterRadios: data,
                    });
                  }}
                  style={styles.search_input_style}
                  placeholder="Radyo adı..."
                />
              </View>
              <Filter changeFilter={this.changeFilter} checkFilter={checkFilter} />
              <View style={styles.list_container}>
                <FlatList ListEmptyComponent={() => (
                  <View
                    style={styles.empty_data_container}>
                    <Text style={styles.empty_data_text}>Herhangi bir kayıt bulunamadı</Text>
                  </View>
                )} showsVerticalScrollIndicator={false} style={styles.list_style}
                          data={filterRadios} numColumns={2} columnWrapperStyle={styles.list_wrapper_style}
                          keyExtractor={(item, index) => index} renderItem={({ item, index }) => {
                  return (
                    <ListItem index={index} item={item} onPlayRadio={this.onPlayRadio} onRemoveAlert={this.onRemoveAlert}
                              favourite={this.favourite} />
                  );
                }} />
              </View>
            </>)}
            <Player playChannel={playChannel} playUrl={playUrl} />
          </View>
        </AuthLayout>
    );
  }
}
