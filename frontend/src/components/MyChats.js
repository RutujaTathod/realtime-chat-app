import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { AddIcon } from '@chakra-ui/icons'
import ChatLoading from './ChatLoading'
import { getSender } from '../config/ChatLogics'
import { useEffect } from 'react'
import GroupChatModal from './miscellaneous/GroupChatModal'
// import { fetchChats } from '../../../backend/controllers/chatControllers'

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState()
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    const toast = useToast();


    const fetchChats = async () => {
        try {
            // console.log("ii")
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            console.log(config)
            const { data } = await axios.get("/api/chat", config);

            setChats(data)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load Chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",

            });

        }
    };
    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
    }, [fetchAgain]);

    // useEffect(() => {
    //     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    //     fetchChats(); // Assuming the correct function name is fetchChats
    // }, []); // Empty dependency array

    return (
        // <div>Chats</div>
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir={"column"}
            alignItems={"center"}
            p={3}
            bg={"white"}
            w={{ base: "100%", md: "31%" }}
            borderRadius={"lg"}
            borderWidth={"1px"}
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily={"serif"}
                display={"flex"}
                w={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}>
                My Chats
                <GroupChatModal>

                    <Button

                        display={"flex"}
                        fontSize={{ base: "14px", md: "8px", lg: "14px" }}
                        rightIcon={<AddIcon />}
                        fontFamily={"sans-serif"}
                    >
                        Create A Group
                    </Button>
                </GroupChatModal>
            </Box>
            <Box
                display={"flex"}
                flexDir={"column"}
                p={3}
                bg={"#F8F8F8"}
                w={"100%"}
                h={"100%"}
                borderRadius={"lg"}
                overflowY={"hidden"}
            >
                {chats ? (
                    <Stack overflowY='scroll'>
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor={"pointer"}
                                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                                color={selectedChat === chat ? "white" : "black"}
                                px={3}
                                py={2}
                                borderRadius={"lg"}
                                key={chat?._id}
                            >
                                <Text>
                                    {!chat.isGroupChat
                                        ? getSender(loggedUser, chat.users)
                                        :
                                        chat.chatName}
                                </Text>
                            </Box>
                        ))}
                    </Stack>

                ) : (
                    <ChatLoading />
                )}

            </Box>

        </Box>
    )
}

export default MyChats
