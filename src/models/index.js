const {connect} = require('mongoose');
const MONGODB_URL = process.env.DATABASE;

module.exports = () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false,
    useUnifiedTopology: true,
  };
  return connect(MONGODB_URL, options);

}