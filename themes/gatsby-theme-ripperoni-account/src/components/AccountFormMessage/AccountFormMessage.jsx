/**
 * @jsx jsx
 * @prettier
 */
import PropTypes from 'prop-types';
import { Box, Heading, Text, jsx } from 'theme-ui';

export const AccountFormMessage = ({
  sentiment = 'error',
  heading = 'The following errors occured:',
  messages,
  ...props
}) => {
  if (!messages || messages.length === 0) return null;

  return (
    <header
      sx={{
        my: 5,
        p: '10px',
        bg: sentiment,
      }}
      {...props}
    >
      <Heading sx={{ fontSize: 3 }} color='white'>
        {heading}
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

AccountFormMessage.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string),
  sentiment: PropTypes.string,
  heading: PropTypes.string,
};
