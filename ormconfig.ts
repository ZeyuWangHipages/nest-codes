import {User} from "./src/user/entities/user.entity";
import {Profile} from "./src/user/entities/profile.entity";
import {Logs} from "./src/logs/logs.entity";
import {Roles} from "./src/roles/roles.entity";
import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export default {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'admin',
    password: 'password',
    database: 'testDb',
    entities: [User, Profile, Logs, Roles],
    synchronize: true,
    logging: false,
} as TypeOrmModuleOptions