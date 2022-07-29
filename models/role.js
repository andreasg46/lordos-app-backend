const {DataTypes} = require('sequelize')
const db = require('../config/db')

const Role = db.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: 'roles',
    timestamps: false
});

async function createRoles() {
    await Role.sync();
    const count = await Role.count() || 0;
    if (count === 0) {
        await Role.create({id: 1, title: 'Parent 1'});
        await Role.create({id: 2, title: 'Parent 2'});
        await Role.create({id: 3, title: 'Child'});
    }
}

createRoles();

module.exports = Role;