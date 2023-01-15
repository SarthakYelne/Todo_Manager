/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
   async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('Todos', 'userId', {
       type: Sequelize.DataTypes.INTEGER
     })
     
     await queryInterface.addConstraint('Todos', {
       fields: ['userId'],
       type: 'foreign key',
       references: {
         table: 'Users',
         field: 'id'
      }
     })
   },

   async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn( 'Todos', 'userId')
  }
}