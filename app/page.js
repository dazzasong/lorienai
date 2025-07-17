'use client';

import { Box, Button, ButtonGroup, InputBase, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = () => {

  };

  return (
    <Stack justifyContent='center' alignItems='center' height='100vh'>
      <Typography position='absolute' top={0} left={0}>LorienAI v1.0</Typography>
      <Typography fontSize={30} fontWeight='bold' mb={2}>What can I help you with?</Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction='row' spacing={1} alignItems='center' mb={2}>
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
        <Typography color="success" fontWeight='bold' mb={1}>── Suggestions ──</Typography>
        <ButtonGroup color="success" orientation="vertical" fullWidth>
          <Button onClick={() => setInput('Write an essay')} sx={{ justifyContent: 'start', textTransform: 'none' }}>Write an essay</Button>
          <Button onClick={() => setInput('Help me study for a test')} sx={{ justifyContent: 'start', textTransform: 'none' }}>Help me study for a test</Button>
          <Button onClick={() => setInput('Play a game with me')} sx={{ justifyContent: 'start', textTransform: 'none' }}>Play a game with me</Button>
        </ButtonGroup>
      </form>
    </Stack>
  );
}
