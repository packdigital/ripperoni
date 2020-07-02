// /** @jsx jsx */
// import { useState } from 'react';
// import { Box, Input, jsx } from 'theme-ui';


// export const LoginInputGroup = ({ name, label, type = 'text', ...props }) => {
//   const [value, setValue] = useState(props.value || '');

//   return (
//     <Box sx={{ width: '100%' }}>
//       <label
//         htmlFor={name}
//         mb={1}
//         variant='text.text.smallCaps'
//       >
//         {label}
//       </label>

//       <Input
//         id={name}
//         name={name}
//         type={type}
//         value={value}
//         required
//         mb={7}
//         onChange={event => setValue(event.target.value)}
//       />
//     </Box>
//   );
// };
