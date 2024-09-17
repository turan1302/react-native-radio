import Video from "react-native-video";
import { Text, View } from "react-native";
import Controls from "../Controls";
import { Component } from "react";
import MusicControl from "react-native-music-control";
import { inject, observer } from "mobx-react";
import styles from "./styles";

@inject("AuthStore")
@observer

export default class Player extends Component {

  constructor(props) {
    super(props);

    this.state = {
      paused: false,
      loading: false,
    };

    MusicControl.enableBackgroundMode(true);
    MusicControl.enableControl("pause",true);
    MusicControl.enableControl("play",true);
    MusicControl.enableControl("stop",true);
    MusicControl.enableControl("nextTrack",false);
    MusicControl.enableControl('previousTrack', false);
    MusicControl.on('play', this.playRadio);
    MusicControl.on('pause', this.pauseRadio);
    MusicControl.on('stop', this.stopRadio);
  }

  playRadio = () => {
    const {playChannel} = this.props;

    MusicControl.resetNowPlaying();
    MusicControl.setNowPlaying({
      title: playChannel,
      artist: 'MFS Radio',
    });
    MusicControl.updatePlayback({
      state : MusicControl.STATE_PLAYING,
    });

    this.setState({
      paused: false,
    });
  };

  pauseRadio = () => {
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PAUSED,
    });

    this.setState({
      paused: true,
    });
  };

  stopRadio = () => {
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PAUSED,
    });
    MusicControl.resetNowPlaying();

    this.setState({
      paused: true,
    });
  };

  loadStart = () => {
    this.setState({
      loading: true,
    },()=>{
      this.playRadio();
    });
  };

  loadEnd = () => {
    if (this.state.loading) {
      MusicControl.updatePlayback({
        state : MusicControl.STATE_PLAYING,
      });
      this.setState({ loading: false,paused : true });
    }
  };

  render() {
    const { paused, loading} = this.state;
    const {playChannel,playUrl} = this.props;

    return (
      <View style={styles.container}>
         <Controls paused={paused} loading={loading} name={playChannel} playRadio={this.playRadio}
                   pauseRadio={this.pauseRadio} />
         <Video onLoadStart={this.loadStart} onProgress={this.loadEnd} paused={paused} playInBackground={true}
                source={{uri : playUrl}} />
       </View>
    );
  }
}
