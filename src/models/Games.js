const { Schema, model } = require('mongoose');

const GameSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  otherTitles: [String],
  developers: [String],
  publishers: [String],
  genres: [String],
  firstReleased: Date,
  japanRelease: Date,
  usaRelease: Date,
  euroRelease: Date,

}, {collection:'games', strict: false},
);

const Game = model('Game',GameSchema);

module.exports = {
  find: (criteria) => {
    const {q, limit, page, fields, orderBy, sortBy = 1} = criteria;
    const skip = (page > 1) ? (page - 1) * limit : 0;

    const query = Game.find();
    if(q) { 
      const regex = new RegExp(`.*${q}.*`, 'i');
      const searchQuery = {$or: [{ title: regex },
      {otherTitles: regex },
      {publishers: regex},
      {developers: regex},

      ] };
      query.find(searchQuery);
    }
    if(limit)  query.limit(limit);
    if(skip) query.skip(skip);
    if(fields) query.select(fields.split(','));
    if(orderBy) query.sort({[orderBy] : sortBy });
    return query.exec() ;
  },
  store: (data) => {
    const game = new Game(data);
    return game.save();
  },
  update: (id, body, options = { new: true}) => {
    return Game.findOneAndUpdate({_id: id}, body, options);
  },
  destroy: (id) => {
    return Game.deleteOne({_id: id})
  }
  };