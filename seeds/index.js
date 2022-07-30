
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '626ff9cb67fd289c3c65f356',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,

            //image: 'https://source.unsplash.com/collection/483251',

            //image: 'https://unsplash.com/photos/P3DxOe-OJGA',
            //image: 'https://unsplash.com/collections/10251910/solace-of-nature',
            //image: 'https://source.unsplash.com/collection/2184453/1600x900',
            description: '   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat et rerum beatae unde corporis cum quos, maxime nesciunt aliquid, harum saepe repellendus ratione molestiae, odio tenetur dolorum recusandae earum illum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cumque quas sed sunt nulla nemo dolorem praesentium cupiditate atque, soluta iste neque, aut magnam illo modi maxime quasi impedit architecto.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwapjnosz/image/upload/v1655267796/YelpCamp/gaoizbyn78azo7xqh93j.png',
                    filename: 'YelpCamp/gaoizbyn78azo7xqh93j',
                },
                {
                    url: 'https://res.cloudinary.com/dwapjnosz/image/upload/v1655267798/YelpCamp/wdsfars5fuxj15xrg7jq.png',
                    filename: 'YelpCamp/wdsfars5fuxj15xrg7jq',
                },
                {
                    url: 'https://res.cloudinary.com/dwapjnosz/image/upload/v1655267801/YelpCamp/znb4bkxkrffd7lu0l5fn.png',
                    filename: 'YelpCamp/znb4bkxkrffd7lu0l5fn',
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})

