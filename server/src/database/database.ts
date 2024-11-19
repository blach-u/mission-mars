import { Sequelize } from 'sequelize';
import { initAstronautModel } from '../models/astronaut';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/database/mydb.sqlite',
});

const Astronaut = initAstronautModel(sequelize);

sequelize.sync({ force: false }).then(async () => {
    try {
        const count = await Astronaut.count();
        if (count === 0) {
            await Astronaut.bulkCreate([
                { name: 'Dr Alice', role: 'Biologist' },
                { name: 'Mark Watney', role: 'Engineer' },
            ]);
        }
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error initializing astronaut data:', error);
    }
}).catch(error => {
    console.error('Unable to synchronize the database:', error);
});

export { sequelize, Astronaut };
