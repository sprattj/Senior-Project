/* This is a file to store all alert types, button types, etc from reactstrap.
    Storing these arrays in one separate file centralizes this data so we have
    less code duplication and can edit them globally if reactstrap changes.
    
    The primary intended usage of these arrays is in PropTypes.oneOf() statements,
    allowing cases where styles can be passed as props to parent components,
    while still ensuring that the value passed is a valid Reactstrap style.
*/

export const reactstrapColors = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark" ];
export const reactstrapButtonSizes = ["sm", "md", "lg"];