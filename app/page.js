'use client';

import { Box, Button, ButtonGroup, InputBase, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newChat = [...chat, { role: 'user', content: input }];
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();
    newChat.push({ role: "assistant", content: data.reply });
    setChat(newChat);
    setInput('');
  };

  return (
    <Stack justifyContent='center' alignItems='center' height='100vh' sx={{ userSelect: 'none' }}>
      <Typography position='absolute' top={0} left={0}>LorienAI v1.0</Typography>
      {chat.length === 0 && <Typography fontSize={30} fontWeight='bold'>What can I help you with?</Typography>}
      <Stack width={350} position='relative' right={10} sx={{ userSelect: 'text' }}>
        {chat.map((msg, index) => (
          <Typography key={index} color={msg.role === 'user' ? 'white' : 'lightgreen'}>
            <b>{msg.role === 'user' ? 'You' : 'LorienAI'}:</b> {msg.content}
          </Typography>
        ))}
      </Stack>
      <form onSubmit={handleSubmit}>
        <Stack direction='row' alignItems='center' spacing={1} my={2}>
          <InputBase
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask anything"
            sx={{
              width: 300,
              color: 'white',
              bgcolor: 'black',
              p: 1,
              border: 2,
              borderRadius: 2
            }}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={!input}
            sx={{ bgcolor: 'grey' }}
          >
            Send
          </Button>
        </Stack>
        {chat.length === 0 &&
          <Box>
            <Typography color="success" fontWeight='bold' mb={1}>── Suggestions ──</Typography>
            <ButtonGroup color="success" orientation="vertical" fullWidth>
              <Button onClick={() => setInput('Write an essay')} sx={{ justifyContent: 'start', textTransform: 'none' }}>Write an essay</Button>
              <Button onClick={() => setInput('Help me study for a test')} sx={{ justifyContent: 'start', textTransform: 'none' }}>Help me study for a test</Button>
              <Button onClick={() => setInput('Play a game with me')} sx={{ justifyContent: 'start', textTransform: 'none' }}>Play a game with me</Button>
            </ButtonGroup>
          </Box>
        }
      </form>
    </Stack>
  );
}
