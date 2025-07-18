'use client';

import { useEffect, useRef, useState } from "react";
import { Box, Button, ButtonGroup, IconButton, InputBase, Stack, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

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
      newChat.push({ role: "assistant", content: data.reply });
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
      <Typography position='absolute' top={0} left={0}>LorienAI v1.0</Typography>
      {chat.length === 0 && <Typography fontSize={30} fontWeight='bold'>What can I help you with?</Typography>}
      <Stack
        width={350}
        maxHeight={400}
        position='relative'
        overflow='auto'
        right={10}
        ref={scrollRef}
        sx={{ userSelect: 'text' }}
      >
        {chat.map((msg, index) => (
          <Box key={index} mb={1}>
            <Typography color={msg.role === 'user' ? 'white' : 'lightgreen'} fontWeight="bold" component="span">
              {msg.role === 'user' ? 'You' : 'LorienAI'}:
            </Typography>
            <Box component="span" sx={{ ml: 1 }}>
              <ReactMarkdown
                components={{
                  p: ({node, ...props}) => <span {...props} />,
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </Box>
          </Box>
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
          <IconButton color="inherit" type="submit" disabled={!input}>{loading ? <div className="spinner" /> : <Send />}</IconButton>
        </Stack>
        {chat.length === 0 &&
          <Box width={300}>
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
