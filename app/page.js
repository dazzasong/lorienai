'use client';

import { useEffect, useRef, useState } from "react";
import { Box, Button, ButtonGroup, IconButton, InputBase, Stack, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";

export default function Home() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  const greetings = [
    "How may I assist you?",
    "Need some help?",
    "Need a hand with something?",
    "What's on your mind?",
    "What's up?",
    "I'm here to help.",
    "What's the issue?",
    "Got a problem to fix?",
    "Got any work for me?",
    "Support at your fingertips.",
    "I will slaughter you in your bedroom.",
    "Let's finish up those assignments!",
    "Perhaps I can write an essay for you?",
  ];

  useEffect(() => {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setGreeting(randomGreeting);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let newChat = [...chat, { role: 'user', content: input }];

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newChat }),
      });
      const data = await res.json();
      newChat.push({ role: 'assistant', content: data.reply });
      setChat(newChat);
      setInput('');
    } catch (err) {
      console.error("Error fetching chat:", err);
    } finally{
      setLoading(false);
    }
  };

  return (
    <Stack justifyContent='center' alignItems='center' height='100vh' sx={{ userSelect: 'none' }}>
      <Typography position='absolute' top={0} left={0}>LorienAI v1.1.0</Typography>
      <Box width='50vw' maxHeight='100vh'>
        <Stack overflow='auto' ref={scrollRef} sx={{ userSelect: chat.length === 0 ? 'none' : 'text' }}>
          {chat.length === 0 ? (
            <Typography fontSize={30} fontWeight='bold'>{greeting}</Typography>
          ) : (
            chat.map((msg, index) => (
              <Typography key={index} color={msg.role === 'user' ? 'white' : 'lightgreen'}>
                <b>{msg.role === 'user' ? 'You' : 'LorienAI'}:</b> {msg.content}
              </Typography>
            ))
          )}
        </Stack>
        <form onSubmit={handleSubmit}>
          <Stack direction='row' alignItems='center' spacing={1} my={2}>
            <InputBase
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything"
              fullWidth
              sx={{
                color: 'white',
                bgcolor: 'black',
                p: 1,
                border: 2,
                borderRadius: 2
              }}
            />
            <IconButton color="inherit" type="submit" disabled={!input}>{loading ? <div className="spinner" /> : <Send />}</IconButton>
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
      </Box>
    </Stack>
  );
}
