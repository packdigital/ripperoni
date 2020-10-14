/**
 * @jsx jsx
 * @prettier
 */
import { Box, Heading, Text, jsx } from 'theme-ui';

export const AccountFormMessage = ({
  messages,
  sentiment = 'bad',
  ...props
}) => {
  if (!messages) return null;

  return (
    <header
      sx={{
        my: 5,
        p: '10px',
        bg: sentiment === 'bad' ? 'error' : 'success',
      }}
      {...props}
    >
      <Heading sx={{ fontSize: 3 }} color='white'>
        {sentiment === 'bad' && 'The following errors occured:'}
      </Heading>

      <Box>
        <ul {...props}>
          {messages.map((message) => (
            <li
              key={message}
              sx={{ fontWeight: 'heavy', fontSize: 3, color: 'white' }}
            >
              <Text>{message}</Text>
            </li>
          ))}
        </ul>
      </Box>
    </header>
  );
};
