// /** @jsx jsx */
// import React, { useState } from 'react';
// import { Button, Heading, jsx } from 'theme-ui';
// import { navigate } from 'gatsby';

// import { Container, FlexCol } from '@theme2/components';

// import useCustomer from '@theme/hooks/useCustomer';

// import CutsLoader from '@components/CutsLoader';
// import { LoginMessage } from '@components/Account/AccountLoginMessage';
// import { LoginInputGroup } from '@components/Account/AccountLoginInputGroup';


// export const AccountPasswordReset = props => {
//   const actions = useCustomer();
//   const [resetWaiting, setResetWaiting] = useState(false);
//   const [resetMessages, setResetMessages] = useState(false);

//   const submitForm = async event => {
//     event.preventDefault();

//     try {
//       const password = event.target.password?.value;
//       const url = `https://cuts-clothing.myshopify.com/account/reset/${props.customerId}/${props.resetToken}`;

//       const response = await actions.reset({ url, password });

//       if (!response.ok) {
//         setResetWaiting(false);
//         setResetMessages({ messages: response.errors });
//       }

//       if (response.data.customer) {
//         navigate('/account');
//       }
//     } catch (error) {
//       setResetWaiting(false);
//     }
//   };

//   return (
//     <React.Fragment>
//       <Heading
//         variant='text.heading.display'
//         sx={{
//           py: 12,
//           bg: 'black',
//           color: 'white',
//           textAlign: 'center',
//         }}
//       >
//         Reset Password
//       </Heading>

//       <Container.Large
//         contain
//         center
//       >
//         <FlexCol
//           as='form'
//           sx={{
//             pt: 9,
//             m: 'auto',
//             width: '100%',
//             maxWidth: '400px',
//           }}
//           onSubmit={event => {
//             submitForm(event);
//             setResetWaiting(true);
//           }}
//         >

//           <LoginInputGroup
//             label='Password'
//             name='password'
//             type='password'
//           />

//           <LoginMessage messages={resetMessages.messages} />

//           {resetWaiting
//             ? <CutsLoader color='dark' />
//             : <Button>Reset Password</Button>
//           }
//         </FlexCol>
//       </Container.Large>
//     </React.Fragment>
//   );
// };

// export default AccountPasswordReset;
