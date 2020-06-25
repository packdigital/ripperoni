// /** @jsx jsx */
// import { Box, Input, jsx } from 'theme-ui';

// import { titleCase } from '@utils';


// export const InputGroup = ({
//   name,
//   value,
//   type = 'text',
//   component,
//   onChange = () => {},
//   required = false,
//   maxlength,
//   size,
//   ...props
// }) => (
//   <Box
//     {...props}
//     sx={{
//       'mb': [2, null, null, null, 6],
//       'flexBasis': ['100%', null, null, null, '50%'],
//     }}
//   >
//     <Box
//       as='label'
//       mb={1}
//       variant='text.s'
//       htmlFor={name}
//     >
//       {titleCase(name)}
//     </Box>


//     {component
//       ? (
//         <Box
//           p={3}
//           sx={{ border: '1px solid lightgray' }}
//         >
//           {component}
//         </Box>
//       )
//       : (
//         <Input
//           id={name}
//           name={name}
//           value={value}
//           type={type}
//           onChange={onChange}
//           size={size}
//           maxlength={maxlength}
//           required={required}
//           sx={{
//             p: 3,
//             fontSize: 2,
//             border: '1px solid lightgray',
//           }}
//         />
//       )
//     }
//   </Box>
// );
