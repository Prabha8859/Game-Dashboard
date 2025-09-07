// ./components/UI-Card-Button-Ludo/ButtonReportLudo.jsx

import React from "react";

export const Button = ({ children, onClick, style, className }) => (
  <button onClick={onClick} style={style} className={className}>
    {children}
  </button>
);


// import React from "react";
 
// export function Button({ children, className, ...props }) {
//   return (
//     <button
//       className={px-4 py-2 rounded-md font-medium text-white ${className}}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }