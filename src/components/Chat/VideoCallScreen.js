import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform, PermissionsAndroid } from 'react-native';
import { RTCView, mediaDevices } from 'react-native-webrtc';
import firestore from '@react-native-firebase/firestore';

const VideoCallScreen = ({ route, navigation }) => {
    const { recipient } = route.params;
    const [localStream, setLocalStream] = useState(null); // Local video stream
    const [remoteStream, setRemoteStream] = useState(null); // Remote video stream
    const [peerConnection, setPeerConnection] = useState(null); // Peer connection
    const [isAudioMuted, setIsAudioMuted] = useState(false);

    useEffect(() => {
        // Request permissions and initialize local stream when component mounts
        const requestPermissions = async () => {
            if (Platform.OS === 'android') {
                await requestAndroidPermissions();
            } else {
                await requestIOSPermissions();
            }
            initializeLocalStream();
        };
        requestPermissions();

        // Clean up when component unmounts
        return () => {
            if (localStream) {
                localStream.release();
            }
            if (peerConnection) {
                peerConnection.close();
            }
        };
    }, []);

    const requestIOSPermissions = async () => {
        // Request camera and microphone permissions on iOS
        const granted = await mediaDevices.requestPermissions(true, true);
        if (!granted) {
            console.warn('Camera or microphone permission not granted');
        }
    };

    const requestAndroidPermissions = async () => {
        // Request camera and microphone permissions on Android
        try {
            const grantedCamera = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs access to your camera',
                    buttonPositive: 'OK',
                }
            );
            const grantedAudio = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Audio Permission',
                    message: 'App needs access to your microphone',
                    buttonPositive: 'OK',
                }
            );
            if (grantedCamera !== PermissionsAndroid.RESULTS.GRANTED ||
                grantedAudio !== PermissionsAndroid.RESULTS.GRANTED) {
                console.warn('Camera or microphone permission not granted');
            }
        } catch (error) {
            console.error('Error requesting camera or microphone permission:', error);
        }
    };

    const initializeLocalStream = async () => {
        // Initialize local video stream
        const stream = await mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);

        // Create peer connection configuration
        const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        const pc = new RTCPeerConnection(configuration);

        // Add local stream to peer connection
        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        // Set remote stream when received
        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };

        setPeerConnection(pc);
    };

    const toggleAudioMute = () => {
        // Toggle audio mute/unmute
        if (peerConnection) {
            localStream.getAudioTracks().forEach(track => {
                track.enabled = !isAudioMuted;
            });
            setIsAudioMuted(!isAudioMuted);
        }
    };

    const handleEndCall = () => {
        // End call and navigate back to chat screen
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {localStream && <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />}
            {remoteStream && <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} />}
            <TouchableOpacity onPress={toggleAudioMute} style={styles.audioToggle}>
                <Text style={styles.audioToggleText}>{isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEndCall} style={styles.endCallButton}>
                <Text style={styles.endCallButtonText}>End Call</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    localVideo: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: 'black',
        margin: 5,
    },
    remoteVideo: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: 'black',
        margin: 5,
    },
    audioToggle: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#47c1ff',
        padding: 10,
        borderRadius: 10,
    },
    audioToggleText: {
        color: '#fff',
        fontSize: 16,
    },
    endCallButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#ff0000',
        padding: 10,
        borderRadius: 10,
    },
    endCallButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default VideoCallScreen;
