// /** @jsx jsx */
// import React, { useState } from 'react';
// import { Box, Button, Heading, jsx } from 'theme-ui';
// import { getNameList } from 'country-list';
// import { Countries } from 'country-and-province';

// import { titleCase } from '@utils';

// import { FlexCol, FlexRow } from '@theme2/components';

// import useCustomer from '@theme/hooks/useCustomer';

// import CutsLoader from '@components/CutsLoader';
// import { InputGroup } from '@components/Account/AccountInputGroup';


// export const AddressForm = ({
//   address = {},
//   isDefault: addressIsDefault = false,
//   hasDefault = true,
//   newAddress,
//   toggleEditForm,
//   action,
//   ...props
// }) => {
//   const actions = useCustomer();
//   const [firstName, setFirstName] = useState(address.firstName || '');
//   const [lastName, setLastName] = useState(address.lastName || '');
//   const [address1, setAddress1] = useState(address.address1 || '');
//   const [address2, setAddress2] = useState(address.address2 || '');
//   const [city, setCity] = useState(address.city || '');
//   const [province, setProvince] = useState(address.province || '');
//   const [zip, setZip] = useState(address.zip || '');
//   const [country, setCountry] = useState(address.country || 'United States');
//   const [isDefault, setIsDefault] = useState(addressIsDefault);
//   const [isWaiting, setIsWaiting] = useState(false);

//   const updateValue = setFunction => event => setFunction(event.target.value);

//   const onSubmit = async event => {
//     event.preventDefault();

//     setIsWaiting(true);

//     const data = {
//       isDefault,
//       id: address.id,
//       address: {
//         firstName,
//         lastName,
//         address1,
//         address2,
//         city,
//         province,
//         zip,
//         country,
//       },
//     };

//     if (!addressIsDefault && isDefault) {
//       actions.address.default({ id: address.id });
//     }

//     const response = await action(data);

//     if (response.ok) {
//       setFirstName('');
//       setLastName('');
//       setAddress1('');
//       setAddress2('');
//       setCity('');
//       setProvince('');
//       setZip('');
//       setCountry('United States');
//     }

//     if (response.ok && !newAddress) {
//       toggleEditForm();
//     }

//     if (!response.ok) {
//       // handle error?
//     }

//     setIsWaiting(false);
//   };

//   const provinceValues = Countries
//     .byName(country)?.provinces?.data.map(({ name, code }) => [name, code]);
//   const countryValues = Object.entries(getNameList());

//   return (
//     <FlexCol
//       as='form'
//       middle
//       between
//       sx={{
//         mb: 3,
//         bg: 'white',
//         p: [10, null, null, null, 12],
//       }}
//       onSubmit={onSubmit}
//       {...props}

//     >
//       <FlexRow
//         middle
//         mb={3}
//         wrapped
//       >
//         <Heading
//           variant='heading.small'
//           sx={{ flex: 1 }}
//         >
//           {`${newAddress ? 'Add' : 'Edit'} Address`}
//         </Heading>

//         {hasDefault && (
//           <>
//             <Box
//               as='input'
//               ml={3}
//               id='default'
//               name='default'
//               type='checkbox'
//               checked={isDefault}
//               onChange={() => setIsDefault(!isDefault)}
//             />

//             <Box
//               as='label'
//               ml={1}
//               variant='text.s'
//               color='darkgray'
//               htmlFor='default'
//             >
//               Make Default
//             </Box>
//           </>
//         )}
//       </FlexRow>

//       <FlexRow
//         wrapped
//         mb={10}
//       >
//         <InputGroup
//           name='firstName'
//           value={firstName}
//           pr={[0, null, null, null, 3]}
//           onChange={updateValue(setFirstName)}
//         />

//         <InputGroup
//           name='lastName'
//           value={lastName}
//           pl={[0, null, null, null, 3]}
//           onChange={updateValue(setLastName)}
//         />

//         <InputGroup
//           name='address1'
//           value={address1}
//           required
//           pr={[0, null, null, null, 3]}
//           onChange={updateValue(setAddress1)}
//         />

//         <InputGroup
//           name='address2'
//           value={address2}
//           pl={[0, null, null, null, 3]}
//           onChange={updateValue(setAddress2)}
//         />

//         <InputGroup
//           name='city'
//           value={city}
//           required
//           pr={[0, null, null, null, 3]}
//           onChange={updateValue(setCity)}
//         />

//         <CountryProvinceDropdown
//           name='province'
//           values={provinceValues}
//           province={province}
//           setProvince={setProvince}
//         />

//         <InputGroup
//           name='zip'
//           required
//           value={zip}
//           type='number'
//           maxlength='5'
//           size='5'
//           pr={[0, null, null, null, 3]}
//           onChange={updateValue(setZip)}
//         />

//         <CountryProvinceDropdown
//           name='country'
//           required
//           values={countryValues}
//           country={country}
//           setCountry={setCountry}
//           setProvince={setProvince}
//         />
//       </FlexRow>

//       <FlexRow
//         center
//         middle
//       >
//         {isWaiting && <CutsLoader color='dark' />}

//         {!isWaiting && newAddress && (
//           <Button mr={5}>Save</Button>
//         )}

//         {!isWaiting && !newAddress && (
//           <React.Fragment>
//             {isWaiting
//               ? <CutsLoader color='dark' />
//               : <Button mr={5}>Update</Button>
//             }

//             <Button
//               ml={5}
//               variant='link'
//               onClick={toggleEditForm}
//             >
//               Cancel
//             </Button>
//           </React.Fragment>
//         )}
//       </FlexRow>
//     </FlexCol>
//   );
// };

// const CountryProvinceDropdown = ({
//   name: inputName,
//   values = [],
//   country,
//   setCountry,
//   province,
//   setProvince,
//   ...props
// }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const closeDropdown = () => setDropdownOpen(false);
//   const isDisabled = values.length === 0;

//   return (
//     <Box
//       sx={{
//         'mb': [2, null, null, null, 6],
//         'flexBasis': ['100%', null, null, null, '50%'],
//         '&:nth-of-type(odd)': { pr: [0, null, null, null, 3] },
//         '&:nth-of-type(even)': { pl: [0, null, null, null, 3] },
//       }}
//       {...props}
//     >
//       <Box
//         as='label'
//         mb={1}
//         variant='text.s'
//         htmlFor={inputName}
//       >
//         {titleCase(inputName)}
//       </Box>

//       <FlexCol
//         sx={{
//           width: '100%',
//           opacity: isDisabled && '0.5',
//           cursor: isDisabled && 'not-allowed'
//         }}
//       >
//         <Box
//           sx={{
//             position: 'relative',
//             pointerEvents: isDisabled && 'none'
//           }}
//         >
//           <Box
//             sx={{
//               variant: 'text.s',
//               ...dropdownBoxSx,
//               ...dropdownChevronSx,
//               height: '40px',
//             }}
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             {inputName === 'province' && titleCase(province)}
//             {inputName === 'country' && titleCase(country)}
//           </Box>

//           <Box
//             sx={{
//               top: '100%',
//               width: '100%',
//               maxHeight: '180px',
//               overflow: 'scroll',
//               position: 'absolute',
//               borderBottom: '1px solid lightgray',
//               zIndex: 1,
//               display: dropdownOpen ? 'block' : 'none',
//             }}
//           >
//             {values.map(([name, value], index) =>
//               <Box
//                 value={value}
//                 sx={dropdownBoxSx}
//                 key={index}
//                 onClick={() => {
//                   if (inputName === 'country' && name !== country) {
//                     setProvince('');
//                     setCountry(name);
//                   }

//                   if (inputName === 'province' && province !== name) {
//                     setProvince(name);
//                   }

//                   closeDropdown();
//                 }}
//                 {...props}
//               >
//                 {titleCase(name)}
//               </Box>
//             )}
//           </Box>
//         </Box>
//       </FlexCol>
//     </Box>

//   );
// };

// const dropdownBoxSx = {
//   width: '100%',
//   display: 'block',
//   p: 3,
//   fontSize: 2,
//   bg: 'white',
//   cursor: 'pointer',
//   position: 'relative',
//   border: '1px solid lightgray',
//   textAlign: 'left',
//   'svg': { display: 'none' },
//   '&:hover': { bg: 'lightgray' },
//   '&.active': { bg: 'gray' }
// };

// const dropdownChevronSx = {
//   '&::after': {
//     content: '" "',
//     display: 'block',
//     position: 'absolute',
//     top: '50%',
//     right: '15px',
//     marginTop: '-3px',
//     width: '0',
//     height: '0',
//     borderStyle: 'solid',
//     borderWidth: '5px 5px 0',
//     borderColor: 'gray transparent transparent',
//   }
// };
