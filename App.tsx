import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';

//@ts-ignore
import sample from './assets/sample.mp3';

const App = () => {
  const playbackState = usePlaybackState();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progressWidth, setProgressWidth] = React.useState(0);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const musicJson = [
    {
      title: 'Death Bed',
      artist: 'Powfu',
      artwork: 'https://samplesongs.netlify.app/album-arts/death-bed.jpg',
      url: 'https://samplesongs.netlify.app/Death%20Bed.mp3',
      id: '1',
    },
    {
      title: 'Bad Liar',
      artist: 'Imagine Dragons',
      artwork: 'https://samplesongs.netlify.app/album-arts/bad-liar.jpg',
      url: 'https://samplesongs.netlify.app/Bad%20Liar.mp3',
      id: '2',
    },
    {
      title: 'Faded',
      artist: 'Alan Walker',
      artwork: 'https://samplesongs.netlify.app/album-arts/faded.jpg',
      url: 'https://samplesongs.netlify.app/Faded.mp3',
      id: '3',
    },
    {
      title: 'Hate Me',
      artist: 'Ellie Goulding',
      artwork: 'https://samplesongs.netlify.app/album-arts/hate-me.jpg',
      url: 'https://samplesongs.netlify.app/Hate%20Me.mp3',
      id: '4',
    },
    {
      title: 'Solo',
      artist: 'Clean Bandit',
      artwork: 'https://samplesongs.netlify.app/album-arts/solo.jpg',
      url: 'https://samplesongs.netlify.app/Solo.mp3',
      id: '5',
    },
    {
      title: 'Without Me',
      artist: 'Halsey',
      artwork: 'https://samplesongs.netlify.app/album-arts/without-me.jpg',
      url: 'https://samplesongs.netlify.app/Without%20Me.mp3',
      id: '6',
    },
  ];

  const handlePlayPause = async () => {
    if (playbackState.state === State.Playing) {
      TrackPlayer.pause();
    } else {
      await TrackPlayer.add(musicJson[1]);
      TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  React.useEffect(() => {
    if (!isInitialized) {
      TrackPlayer.setupPlayer();
      setIsInitialized(true);
    }
    setInterval(async () => {
      TrackPlayer.getProgress().then(({position, duration}) => {
        if (duration) {
          const newProgressWidth = (Number(position) / duration) * 100;
          setProgressWidth(newProgressWidth);
        } else {
          setProgressWidth(0);
        }
      });
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={[styles.progress, {width: `${progressWidth}%`}]} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.playPauseButton}
          onPress={async () => {
            const {position, duration} = await TrackPlayer.getProgress();
            const newProgressWidth =
              (Math.max(0, position - 10) / duration) * 100;
            await TrackPlayer.seekTo(newProgressWidth);
            setProgressWidth(newProgressWidth);
          }}>
          <Text style={styles.text}>{'<<'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playPauseButton}
          onPress={handlePlayPause}>
          <Text style={styles.text}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playPauseButton}
          onPress={async () => {
            const newProgressWidth = Math.min(100, progressWidth + 10);
            await TrackPlayer.seekTo(newProgressWidth);
            setProgressWidth(newProgressWidth);
          }}>
          <Text style={styles.text}>{'>>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  playPauseButton: {
    padding: 8,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginBottom: 8,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  progressContainer: {
    height: 20,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
  progress: {
    height: 20,
    backgroundColor: '#00b5ec',
  },
});

export default App;
