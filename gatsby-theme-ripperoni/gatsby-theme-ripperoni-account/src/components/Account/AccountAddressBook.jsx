// /** @jsx jsx */
// import { Heading, jsx } from 'theme-ui';
// import isEqual from 'lodash/isEqual';

// import { FlexCol } from '@theme2/components';

// import useGlobal from '@theme/store';

// import useCustomer from '@theme/hooks/useCustomer';

// import { Address } from '@components/Account/AccountAddress';
// import { AddressForm } from '@components/Account/AccountAddressForm';
// import { AccountLayout } from '@components/Account/AccountLayout';


// export const AccountAddressBook = props => {
//   const actions = useCustomer();
//   const [{ customer }] = useGlobal();

//   return (
//     <AccountLayout {...props}>
//       <Heading mb={7}>Address Book</Heading>

//       <FlexCol>
//         {customer.addresses.map((address, index) => {
//           const { id: newAddressId, ...newAddress } = address || {};
//           const { id: defaultAddressId, ...defaultAddress } = customer.defaultAddress || {};
//           const isDefault = isEqual(newAddress, defaultAddress);

//           return (
//             <Address
//               key={index}
//               address={address}
//               isDefault={isDefault}
//               action={actions.address.update}
//             />
//           );
//         })}

//         <AddressForm
//           newAddress
//           action={actions.address.create}
//         />
//       </FlexCol>
//     </AccountLayout>
//   );
// };


// export default AccountAddressBook;
