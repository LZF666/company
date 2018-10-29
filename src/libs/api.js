let domain = '';
if(process.env.NODE_ENV === 'production') {
  domain = 'http://api.cucoe.net'
} else {
  domain = ''
}
export default domain