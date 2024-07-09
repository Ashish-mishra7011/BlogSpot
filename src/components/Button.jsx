// import PropTypes from 'prop-types';
function Button({
    children,
    type="button",
    bgColor="bg-blue-600",
    textColor="text-white",
    className='',
    ...props

}) {

  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor}  ${className}`} {...props}>
        {children}
    </button>
  )
}
//do this when you want to submit code ; it is just a replacement for eslint error 
// Button.propTypes = {
//     children: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     bgColor: PropTypes.string.isRequired,
//     textColor: PropTypes.string.isRequired,
//     className: PropTypes.string.isRequired
//   }

export default Button