const Coin = require('../models/Coin');

async function createCoin(data) {
    const coin = new Coin(data);
    await coin.save();
    return coin;
};
async function getAllCoins() {
    return await Coin.find({}).populate('ownerId').lean();
};
async function getCoinById(id) {
    return Coin.findById(id).populate('ownerId').lean();
};
async function updateCoin(id, post) {
    const existing = await Coin.findByIdAndUpdate(id, post);
    await existing.save();
    return existing;
};
async function deleteCoin(id) {
    return await Coin.findByIdAndRemove(id);
};
async function getSearched(data) {
    let coins = await Coin.find({ payment: data.payment }).lean();
    if (data.search !== '') {
        coins = coins.filter(coin => coin.name.toLowerCase() == data.search.toLowerCase());
    };
    return coins;
};


module.exports = {
    createCoin,
    getAllCoins,
    getCoinById,
    updateCoin,
    deleteCoin,
    getSearched
};