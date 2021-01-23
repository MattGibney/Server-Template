const AdvertDao = require('./daos/adverts');

class DaoFactory {
  constructor() {
    this.advert = new AdvertDao();
  }
}

module.exports = DaoFactory;
