export const ADDREESS_DETAILS = {
  NEXT: "Next",
  BACK: "Back",
  TITLE: "Enter store address details",
  TYPE_LABEL: "Address Name",
  TYPE: "addressName",
  TYPE_RULES: [
    {
      required: true,
      message: "Can not be blank",
      whitespace: true,
    },
    { min: 3, message: "Must contain atleast 3 characters" },
  ],
  TYPE_PLACEHOLDER: "Eg. Home Office",
  NAME_LABEL: "Name",
  NAME: "name",
  NAME_RULES: [
    {
      required: true,
      message: "name can not be blank",
      whitespace: true,
    },
    { min: 3, message: "name must contain atleast 3 characters" },
    {
      pattern: new RegExp(/^[a-zA-Z][a-zA-Z\s]*$/),
      message: "numbers and special characters not allowed",
    },
  ],
  NAME_PLACEHOLDER: "Enter name",

  MOBILE_LABEL: "Mobile No",
  MOBILE: "mobile",
  MOBILE_RULES: [
    {
      required: true,
      message: "Please enter your phone number",
    },
    {
      pattern: new RegExp(/^\d{10}$/),
      message: "Enter a valid phone number",
    },
  ],
  MOBILE_PLACEHOLDER: "Enter mobile number",

  SEARCH_LABEL: "Search by society name, area and city",
  SEARCH_NAME: "search",
  //   SEARCH_RULES: [
  //     {
  //       required: true,
  //       message: "address can not be blank",
  //       whitespace: true,
  //     },
  //     {
  //       //   pattern: new RegExp(/^[a-zA-Z][a-zA-Z\s]*$/),
  //       message: "space is not allowed at begining",
  //     },
  //   ],
  SEARCH_PLACEHOLDER: "Search by society name, area and city",

  ADDRESS1_LABEL: "Give this address a name *",
  ADDRESS_NAME1: "addr1",
  ADDRESS_RULES1: [
    {
      required: true,
      message: "address can not be blank",
      whitespace: true,
    },
    { min: 5, message: "address must contain atleast 5 characters" },
    // {
    //   pattern: new RegExp(/^\s+|\s\s+|\s+$/g),
    //   message: "space is not allowed at begining",
    // },
  ],
  ADDRESS_PLACEHOLDER1: "Home, Work etc...",

  ADDRESS1_LABEL2: "Address-line-2",
  ADDRESS_NAME2: "addr2",
  ADDRESS_PLACEHOLDER2: "Enter address",
  PINCODE_LABEL: "Pincode",
  PINCODE_NAME: "pinCode",
  PINCODE_RULES: [
    { required: true, message: "Pincode is required" },
    {
      pattern: new RegExp(/^[0-9]{6}(?:-[0-9]{4})?$/),
      message: "Enter valid pincode",
    },
  ],
  PINCODE_PLACEHOLDER: "Enter pincode",
  STATE_LABEL: "State",
  STATE_NAME: "state",
  STATE_PLACEHOLDER: "Enter state",
  STATE_RULES: [
    { required: true, message: "state name is required" },
    {
      min: 3,
      required: true,
      message: "state must contain atleast 3 characters",
    },
  ],
  CITY_LABEL: "City",
  CITY_NAME: "city",
  CITY_PLACEHOLDER: "Enter city",
  CITY_RULES: [
    { required: true, message: "city name is required" },
    {
      min: 3,
      required: true,
      message: "city must contain atleast 3 characters",
    },
  ],
  COUNTRY_LABEL: "Country",
  COUNTRY_NAME: "country",
  COUNTRY_PLACEHOLDER: "Enter country",
  COUNTRY_RULES: [
    { required: true, message: "country name is required" },
    {
      min: 3,
      required: true,
      message: "country must contain 3 atleast characters",
    },
  ],
};
