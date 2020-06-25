/** @jsx jsx */
import { Box, Heading, Text, jsx } from 'theme-ui';


export const LoginMessage = ({
  messages,
  sentiment = 'bad',
  ...props
}) => {
  if (!messages) return null;

  return (
    <header
      sx={{
        mb: 5,
        p: '10px',
        color: 'white',
        bg: sentiment === 'bad' ? 'warning' : 'success',
      }}
      {...props}
    >
      <Heading sx={{ fontSize: 3 }}>
        {sentiment === 'bad' &&
          'The following errors occured:'}
      </Heading>
      <Box>
        <ul {...props}>
          {messages.map(message => (
            <li key={message}>
              <Text sx={{ fontWeight: 'heavy', fontSize: 3 }}>{message}</Text>
            </li>
          ))}
        </ul>
      </Box>
    </header>
  );
};
