import React from "react";
import { StyleSheet, ViewStyle, Dimensions } from "react-native";
import {InputToolbar, InputToolbarProps, IMessage, Composer, SendProps} from "react-native-gifted-chat";
import MessageSendButton from "./Buttons/MessageSendButton";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function MessageInputBar(props: InputToolbarProps<IMessage>) {
	return (
		<InputToolbar
			{...props}
			containerStyle={styles.inputContainer}
			primaryStyle={styles.primaryStyle}
			renderComposer={(composerProps) => (
				<Composer
					{...composerProps}
					textInputStyle={styles.textInput}
				/>
			)}
			renderSend={(sendProps: SendProps<IMessage>) => (
				<MessageSendButton onSend={()=>{
					if (sendProps.text && sendProps.onSend) {
						sendProps.onSend({ text: sendProps.text.trim() } as IMessage, true);
					}
				}}
				/>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		position: "absolute",
		width: "89%",
		left: "6%",
		bottom: "10%",
		paddingHorizontal: 5,
		paddingTop: 5,
		borderRadius: 10,
		backgroundColor: "white",
	},
	primaryStyle: {
		alignItems: "center",
	},
	textInput: {
		flex: 1,
		marginRight: 10,
		paddingHorizontal: 10,
		paddingVertical: 5,
		fontSize: 16,
		lineHeight: 16,
		maxHeight: 100,
		color: "black",
	},
});
