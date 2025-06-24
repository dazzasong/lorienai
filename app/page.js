import { Button, ButtonGroup, InputBase, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Stack justifyContent='center' alignItems='center' height='100vh'>
      <Typography position='absolute' top={0} left={0}>LorienAI v1.0</Typography>
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography fontSize={30} fontWeight='bold'>What can I help you with?</Typography>
          <InputBase
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
        </Stack>
        <Stack spacing={1}>
          <Typography color="success" fontWeight='bold'>── Suggestions ──</Typography>
          <ButtonGroup color="success" orientation="vertical" >
            <Button sx={{ justifyContent: 'start', textTransform: 'none' }}>Write an essay</Button>
            <Button sx={{ justifyContent: 'start', textTransform: 'none' }}>Help me study for a test</Button>
            <Button sx={{ justifyContent: 'start', textTransform: 'none' }}>Play a game with me</Button>
          </ButtonGroup>
        </Stack>
      </Stack>
    </Stack>
  );
}
