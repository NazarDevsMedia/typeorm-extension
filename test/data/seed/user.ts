import type { DataSource } from 'typeorm';
import type { Seeder, SeederFactoryManager } from '../../../src';
import { User } from '../entity/user';

export default class UserSeeder implements Seeder {
    track = true;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ) : Promise<unknown> {
        const repository = dataSource.getRepository(User);

        await repository.insert([
            {
                firstName: 'Caleb', lastName: 'Barrows', email: 'caleb.barrows@gmail.com',
            },
        ]);

        // ---------------------------------------------------

        const items : User[] = [];

        const userFactory = factoryManager.get(User);
        userFactory.setMeta({ foo: 'bar' });

        // save 1 factory generated entity, to the database
        items.push(await userFactory.save());

        // save 5 factory generated entities, to the database
        items.push(...await userFactory.saveMany(5));

        return items;
    }
}
