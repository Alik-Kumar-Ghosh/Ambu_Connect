import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Navbar from "../../HomePage/Navbar";

const VideoCall = () => {
  const { roomID } = useParams();
  const containerRef = useRef(null);
  const participantsRef = useRef({});

  useEffect(() => {
    const appID = 1766665161;
    const serverSecret = "7f5466381863f561c7554708cc2db7d3";

    const handleRemoteUserJoin = (user) => {
      participantsRef.current[user.userID] = user;
    };

    const handleRemoteUserLeave = (userID) => {
      delete participantsRef.current[userID];
    };

    const handleRoomStreamUpdate = (roomID, updateType, streamList, extendedData) => {
      if (updateType === 'ADD') {
        const user = participantsRef.current[streamList[0].userID];
        if (user) {
          user.stream = streamList[0];
        }
      }
    };

    const myMeeting = async () => {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        Date.now().toString(),
        "Ambuconnect"
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);

      zc.joinRoom({
        container: containerRef.current,
        sharedLinks: [
          {
            name: "copy link",
            url: `https://ambuconnect.vercel.app/room/${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
        onRemoteUserJoin: handleRemoteUserJoin,
        onRemoteUserLeave: handleRemoteUserLeave,
        onRoomStreamUpdate: handleRoomStreamUpdate,
      });
    };

    if (roomID) {
      myMeeting();
    }
  }, [roomID]);

  const renderParticipants = () => {
    return Object.values(participantsRef.current).map((user) => {
      if (user.stream) {
        return (
          <div key={user.userID} style={{ width: "48%", height: "100%" }}>
            <video
              style={{ width: "100%", height: "100%" }}
              srcObject={user.stream.getVideoStream()}
              autoplay
            />
          </div>
        );
      }
      return null;
    });
  };

  return (
    <>
      <Navbar />
      <div className="video-call-container" style={{ width: "100vw", height: "100vh" }}>
        <div ref={containerRef} style={{ width: "100%", height: "80%" }}>
          {/* ZegoUIKitPrebuilt UI will render here */}
        </div>
        <div style={{ width: "100%", height: "20%", overflow: "auto" }}>
          {renderParticipants()}
        </div>
      </div>
    </>
  );
};

export default VideoCall;
