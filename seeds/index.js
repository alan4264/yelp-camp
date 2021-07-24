const mongoose = require('mongoose');
const cities = require('./cities'); 
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random()*array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});

    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '60eb4c871caff0249400fb65',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quo, tenetur quisquam omnis vel delectus, ex ratione magni eos accusantium ipsa quae saepe possimus recusandae, repellendus odit praesentium officia quibusdam.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/df3vvd3/image/upload/v1626364821/YelpCamp/tsmee0jnyztplt0xtapy.jpg',
                    filename: 'YelpCamp/tsmee0jnyztplt0xtapy'
                },
                {
                    url: 'https://res.cloudinary.com/df3vvd3/image/upload/v1626364121/YelpCamp/ayoui5uvwpknnzxtpw5a.jpg',
                    filename: 'YelpCamp/ayoui5uvwpknnzxtpw5a'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
